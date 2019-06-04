require "application_system_test_case"

class AccessHistoriesTest < ApplicationSystemTestCase
  setup do
    @access_history = access_histories(:one)
  end

  test "visiting the index" do
    visit access_histories_url
    assert_selector "h1", text: "Access Histories"
  end

  test "creating a Access history" do
    visit access_histories_url
    click_on "New Access History"

    fill_in "Board", with: @access_history.board_id
    fill_in "Thre", with: @access_history.thre_id
    click_on "Create Access history"

    assert_text "Access history was successfully created"
    click_on "Back"
  end

  test "updating a Access history" do
    visit access_histories_url
    click_on "Edit", match: :first

    fill_in "Board", with: @access_history.board_id
    fill_in "Thre", with: @access_history.thre_id
    click_on "Update Access history"

    assert_text "Access history was successfully updated"
    click_on "Back"
  end

  test "destroying a Access history" do
    visit access_histories_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Access history was successfully destroyed"
  end
end
