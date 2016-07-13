require 'test_helper'

class Api::CommentsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
  setup do
    @comment = create(:comment)
    @annotation = @comment.annotation
    @paper = @annotation.review.paper
    sign_in @annotation.review.reviewer
  end

  test "should get index" do
    get api_paper_annotation_comments_url(paper_id: @paper.id, annotation_id: @annotation.id), as: :json
    assert_equal [@comment].to_json, response.body
    assert_response :success
  end

  test "should create annotation" do
    assert_difference('Comment.count') do
      post api_paper_annotation_comments_url(paper_id: @paper.id, annotation_id: @annotation.id), params: attributes_for(:comment), as: :json
    end

    assert_response 201
  end

  test "should show annotation" do
    get api_paper_annotation_comment_url(paper_id: @paper.id, annotation_id: @annotation.id, id: @comment.id), as: :json
    assert_response :success
  end

  test "should destroy annotation" do
    assert_difference('Comment.count', -1) do
      delete api_paper_annotation_comment_url(paper_id: @paper.id, annotation_id: @annotation.id, id: @comment.id), as: :json
    end

    assert_response 204
  end
end
