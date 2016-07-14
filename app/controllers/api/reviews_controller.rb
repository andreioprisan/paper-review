class Api::ReviewsController < ApiController
  before_action :authenticate_user!

  def create
    review = Review.find_by(paper_id: params[:paper_id], reviewer: current_user)
    review.finished = true

    params[:answers].each do |question_id, answer|
      question = Question.find(question_id)
      review.answers.create(question: question.text, question_type: question.question_type, answer: answer)
    end

    if review.save
      render json: review, status: :ok
    else
      render json: review.errors, status: :unprocessable_entity
    end
  end

end
