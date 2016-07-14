class Api::PapersController < ApiController

  def index
    @papers = Paper.all
    render json: @papers
  end

  def show
    render json: Paper.find(params[:id])
  end

end
