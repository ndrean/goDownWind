require "application_system_test_case"

class AventsTest < ApplicationSystemTestCase
  setup do
    @avent = avents(:one)
  end

  test "visiting the index" do
    visit avents_url
    assert_selector "h1", text: "Avents"
  end

  test "creating a Avent" do
    visit avents_url
    click_on "New Avent"

    click_on "Create Avent"

    assert_text "Avent was successfully created"
    click_on "Back"
  end

  test "updating a Avent" do
    visit avents_url
    click_on "Edit", match: :first

    click_on "Update Avent"

    assert_text "Avent was successfully updated"
    click_on "Back"
  end

  test "destroying a Avent" do
    visit avents_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Avent was successfully destroyed"
  end
end
