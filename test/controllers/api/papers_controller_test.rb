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
    finished_review = create(:finished_review, reviewer: @user)

    another_paper = create(:paper)
    create_pair(:finished_review, paper: another_paper)

    get api_papers_url, as: :json
    returned_ids = response.parsed_body.map { |i| [i['id'], i['finished'], i['user_reviewed']] }

    assert_includes returned_ids, [@paper.id, false, false], 'Paper with no review'
    assert_includes returned_ids, [unfinished_review.paper.id, false, false], 'Paper with unfinished review'
    assert_includes returned_ids, [finished_review.paper.id, false, true], 'Paper with finished review'
    assert_includes returned_ids, [another_paper.id, true, false], 'Paper with two finished reviews'
    assert_response :success
  end

  test "should show paper" do
    get api_paper_url(paper_id: @paper.id, id: @paper.id), as: :json
    assert_response :success
  end
end
