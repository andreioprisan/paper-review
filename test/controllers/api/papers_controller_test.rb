require 'test_helper'

class Api::PapersControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
  setup do
    @paper = create(:paper)
    @user = create(:user)
    sign_in @user
  end

  test "should get only papers for review" do
    unfinished_review = create(:review, reviewer: @user)
    finished_review = create(:finished_review)

    get api_papers_url, as: :json
    returned_ids = response.parsed_body.map { |i| i['id'] }

    assert_includes returned_ids, @paper.id, 'Paper with no review'
    assert_includes returned_ids, unfinished_review.paper.id, 'Paper with unfinished review we should find'
    refute_includes returned_ids, finished_review.paper.id, 'Paper with finished review we should not find'
    assert_response :success
  end

  test "should show paper" do
    get api_paper_url(paper_id: @paper.id, id: @paper.id), as: :json
    assert_response :success
  end
end
