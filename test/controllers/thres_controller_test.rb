require 'test_helper'

class ThresControllerTest < ActionDispatch::IntegrationTest
  setup do
    @thre = thres(:one)
  end

  test "should get index" do
    get thres_url
    assert_response :success
  end

  test "should get new" do
    get new_thre_url
    assert_response :success
  end

  test "should create thre" do
    assert_difference('Thre.count') do
      post thres_url, params: { thre: { board_id: @thre.board_id, num: @thre.num, title: @thre.title } }
    end

    assert_redirected_to thre_url(Thre.last)
  end

  test "should show thre" do
    get thre_url(@thre)
    assert_response :success
  end

  test "should get edit" do
    get edit_thre_url(@thre)
    assert_response :success
  end

  test "should update thre" do
    patch thre_url(@thre), params: { thre: { board_id: @thre.board_id, num: @thre.num, title: @thre.title } }
    assert_redirected_to thre_url(@thre)
  end

  test "should destroy thre" do
    assert_difference('Thre.count', -1) do
      delete thre_url(@thre)
    end

    assert_redirected_to thres_url
  end
end
