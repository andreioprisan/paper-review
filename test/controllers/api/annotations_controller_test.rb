require 'test_helper'

class Api::AnnotationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @annotation = annotations(:one)
  end

  test "should get index" do
    get api_annotations_url, as: :json
    assert_response :success
  end

  test "should create annotation" do
    assert_difference('Annotation.count') do
      post api_annotations_url, params: { annotation: @annotation.annotation }, as: :json
    end

    assert_response 201
  end

  test "should show annotation" do
    get api_annotation_url(@annotation), as: :json
    assert_response :success
  end

  test "should destroy annotation" do
    assert_difference('Annotation.count', -1) do
      delete api_annotation_url(@annotation), as: :json
    end

    assert_response 204
  end
end
