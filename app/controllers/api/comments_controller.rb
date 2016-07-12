class Api::CommentsController < ApiController
  before_action :set_annotation
  before_action :set_comment, only: [:show, :update, :destroy]

  def index
    @comments = @annotation.comments

    render json: @comments
  end

  def show
    render json: @comment
  end

  def create
    @comment = @annotation.comments.new(comment_params)

    if @comment.save
      render json: @comment,
             status: :created,
             location: api_paper_annotation_comment_url(paper_id: @annotation.review.paper_id,
                                                        annotation_id: @comment.annotation_id,
                                                        id: @comment.id)
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @comment.destroy
  end

  private
    def set_annotation
      @annotation = Annotation.find(params[:annotation_id])
    end

    def set_comment
      @comment = Comment.find(params[:id])
    end

    def comment_params
      params.require(:comment).permit(:content)
    end
end
