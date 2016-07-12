require 'test_helper'

class Api::AnnotationsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
  setup do
    @annotation = annotations(:one)
    @paper = papers(:one)
    sign_in users(:one)
  end

  test "should get index" do
    get api_paper_annotations_url(paper_id: @paper.id), as: :json
    assert_response :success
  end

  test "should create annotation" do
    assert_difference('Annotation.count') do
      post api_paper_annotations_url(paper_id: @paper.id), params: { annotation: @annotation.annotation }, as: :json
    end

    assert_response 201
  end

  test "should show annotation" do
    get api_paper_annotation_url(paper_id: @paper.id, id: @annotation.id), as: :json
    assert_response :success
  end

  test "should destroy annotation" do
    assert_difference('Annotation.count', -1) do
      delete api_paper_annotation_url(paper_id: @paper.id, id: @annotation.id), as: :json
    end

    assert_response 204
  end
end
