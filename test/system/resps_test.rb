require "application_system_test_case"

class RespsTest < ApplicationSystemTestCase
  setup do
    @resp = resps(:one)
  end

  test "visiting the index" do
    visit resps_url
    assert_selector "h1", text: "Resps"
  end

  test "creating a Resp" do
    visit resps_url
    click_on "New Resp"

    fill_in "Contents", with: @resp.contents
    fill_in "Date", with: @resp.date
    fill_in "Email", with: @resp.email
    fill_in "Name", with: @resp.name
    fill_in "Num", with: @resp.num
    fill_in "Thre", with: @resp.thre_id
    fill_in "Userid", with: @resp.userid
    fill_in "Wacchoi", with: @resp.wacchoi
    click_on "Create Resp"

    assert_text "Resp was successfully created"
    click_on "Back"
  end

  test "updating a Resp" do
    visit resps_url
    click_on "Edit", match: :first

    fill_in "Contents", with: @resp.contents
    fill_in "Date", with: @resp.date
    fill_in "Email", with: @resp.email
    fill_in "Name", with: @resp.name
    fill_in "Num", with: @resp.num
    fill_in "Thre", with: @resp.thre_id
    fill_in "Userid", with: @resp.userid
    fill_in "Wacchoi", with: @resp.wacchoi
    click_on "Update Resp"

    assert_text "Resp was successfully updated"
    click_on "Back"
  end

  test "destroying a Resp" do
    visit resps_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Resp was successfully destroyed"
  end
end
