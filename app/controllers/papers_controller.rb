class PapersController < ApplicationController
  before_action :authenticate_user!

  def index
    @paper = Paper.new
  end

  def create
    @paper = Paper.new(paper_params)
    @paper.submitter = current_user

    respond_to do |format|
      if @paper.save
        format.html { redirect_to '/' }
        format.json { render json: { }, status: :created, location: @paper }
      else
        format.html { render action: 'new' }
        format.json { render json: @paper.errors, status: :unprocessable_entity }
      end
    end
  end

  def show
    @paper = Paper.find(params[:id])
    send_data(@paper.data,
              type: 'application/pdf',
              filename: @paper.name)
  end

  def paper_params
    params.require(:paper).permit(:data, :requested_reviews)
  end
end
