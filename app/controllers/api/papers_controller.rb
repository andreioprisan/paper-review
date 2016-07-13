class Api::PapersController < ApiController

  def index
    @papers = Paper.left_outer_joins(:reviews)
                   .where("(reviews.finished != TRUE AND reviews.reviewer_id = :reviewer_id) OR reviews.id IS NULL", { reviewer_id: current_user.id })
    render json: @papers
  end

  def show
    render json: Paper.find(params[:id])
  end

end
