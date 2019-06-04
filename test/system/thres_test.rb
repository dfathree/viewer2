require "application_system_test_case"

class ThresTest < ApplicationSystemTestCase
  setup do
    @thre = thres(:one)
  end

  test "visiting the index" do
    visit thres_url
    assert_selector "h1", text: "Thres"
  end

  test "creating a Thre" do
    visit thres_url
    click_on "New Thre"

    fill_in "Board", with: @thre.board_id
    fill_in "Num", with: @thre.num
    fill_in "Title", with: @thre.title
    click_on "Create Thre"

    assert_text "Thre was successfully created"
    click_on "Back"
  end

  test "updating a Thre" do
    visit thres_url
    click_on "Edit", match: :first

    fill_in "Board", with: @thre.board_id
    fill_in "Num", with: @thre.num
    fill_in "Title", with: @thre.title
    click_on "Update Thre"

    assert_text "Thre was successfully updated"
    click_on "Back"
  end

  test "destroying a Thre" do
    visit thres_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Thre was successfully destroyed"
  end
end
