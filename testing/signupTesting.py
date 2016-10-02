from selenium import webdriver
from selenium.webdriver.common.keys import Keys

browser = webdriver.Firefox()

browser.get('http://localhost:3000/')
assert 'Whitter' in browser.title

signup_name = browser.find_element_by_name('name')
signup_email = browser.find_element_by_name('email')
signup_username = browser.find_element_by_name('signup_username')
signup_password = browser.find_element_by_name('signup_password')
signup_button = browser.find_element_by_name('signup_button')

print signup_button
signup_name.send_keys('user1')
signup_email.send_keys('user1@test.com')
signup_username.send_keys('user1')
signup_password.send_keys('passw0rd')

signup_button.click()

#browser.quit()
