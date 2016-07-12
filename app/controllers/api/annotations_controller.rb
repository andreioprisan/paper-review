class Api::AnnotationsController < ApiController
  before_action :set_annotation, only: [:show, :update, :destroy]
  before_action :authenticate_user!

  def index
    @annotations = Annotation.all

    render json: @annotations
  end

  def show
    render json: @annotation
  end

  def create
    review = Review.find_or_create_by(reviewer: current_user, paper_id: params[:paper_id], finished: false)
    @annotation = Annotation.new(annotation: params[:annotation], review: review)

    if @annotation.save
      render json: @annotation, status: :created, location: api_paper_annotation_url(paper_id: review.paper_id, id: @annotation.id)
    else
      render json: @annotation.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @annotation.destroy
  end

  private
    def set_annotation
      @annotation = Annotation.find(params[:id])
    end
end
