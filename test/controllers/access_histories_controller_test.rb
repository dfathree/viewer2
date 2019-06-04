require 'test_helper'

class AccessHistoriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @access_history = access_histories(:one)
  end

  test "should get index" do
    get access_histories_url
    assert_response :success
  end

  test "should get new" do
    get new_access_history_url
    assert_response :success
  end

  test "should create access_history" do
    assert_difference('AccessHistory.count') do
      post access_histories_url, params: { access_history: { board_id: @access_history.board_id, thre_id: @access_history.thre_id } }
    end

    assert_redirected_to access_history_url(AccessHistory.last)
  end

  test "should show access_history" do
    get access_history_url(@access_history)
    assert_response :success
  end

  test "should get edit" do
    get edit_access_history_url(@access_history)
    assert_response :success
  end

  test "should update access_history" do
    patch access_history_url(@access_history), params: { access_history: { board_id: @access_history.board_id, thre_id: @access_history.thre_id } }
    assert_redirected_to access_history_url(@access_history)
  end

  test "should destroy access_history" do
    assert_difference('AccessHistory.count', -1) do
      delete access_history_url(@access_history)
    end

    assert_redirected_to access_histories_url
  end
end
