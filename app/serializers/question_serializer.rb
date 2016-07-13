class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :text, :question_type, :steps
end
