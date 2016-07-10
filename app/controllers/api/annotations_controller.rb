class Api::AnnotationsController < ApiController
  before_action :set_annotation, only: [:show, :update, :destroy]

  def index
    @annotations = Annotation.all

    render json: @annotations
  end

  def show
    render json: @annotation
  end

  def create
    @annotation = Annotation.new(annotation: params[:annotation])

    if @annotation.save
      render json: @annotation, status: :created, location: api_annotation_url(@annotation)
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
