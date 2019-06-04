require 'test_helper'

class RespsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @resp = resps(:one)
  end

  test "should get index" do
    get resps_url
    assert_response :success
  end

  test "should get new" do
    get new_resp_url
    assert_response :success
  end

  test "should create resp" do
    assert_difference('Resp.count') do
      post resps_url, params: { resp: { contents: @resp.contents, date: @resp.date, email: @resp.email, name: @resp.name, num: @resp.num, thre_id: @resp.thre_id, userid: @resp.userid, wacchoi: @resp.wacchoi } }
    end

    assert_redirected_to resp_url(Resp.last)
  end

  test "should show resp" do
    get resp_url(@resp)
    assert_response :success
  end

  test "should get edit" do
    get edit_resp_url(@resp)
    assert_response :success
  end

  test "should update resp" do
    patch resp_url(@resp), params: { resp: { contents: @resp.contents, date: @resp.date, email: @resp.email, name: @resp.name, num: @resp.num, thre_id: @resp.thre_id, userid: @resp.userid, wacchoi: @resp.wacchoi } }
    assert_redirected_to resp_url(@resp)
  end

  test "should destroy resp" do
    assert_difference('Resp.count', -1) do
      delete resp_url(@resp)
    end

    assert_redirected_to resps_url
  end
end
