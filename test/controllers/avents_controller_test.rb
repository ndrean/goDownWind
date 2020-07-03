require 'test_helper'

class AventsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @avent = avents(:one)
  end

  test "should get index" do
    get avents_url
    assert_response :success
  end

  test "should get new" do
    get new_avent_url
    assert_response :success
  end

  test "should create avent" do
    assert_difference('Avent.count') do
      post avents_url, params: { avent: {  } }
    end

    assert_redirected_to avent_url(Avent.last)
  end

  test "should show avent" do
    get avent_url(@avent)
    assert_response :success
  end

  test "should get edit" do
    get edit_avent_url(@avent)
    assert_response :success
  end

  test "should update avent" do
    patch avent_url(@avent), params: { avent: {  } }
    assert_redirected_to avent_url(@avent)
  end

  test "should destroy avent" do
    assert_difference('Avent.count', -1) do
      delete avent_url(@avent)
    end

    assert_redirected_to avents_url
  end
end
