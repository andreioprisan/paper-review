class Api::QuestionsController < ApiController

  def index
    @questions = Question.all
    render json: @questions
  end

end
