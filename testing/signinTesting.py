from selenium import webdriver
from selenium.webdriver.common.keys import Keys

browser = webdriver.Firefox()

browser.get('http://localhost:49160/')
assert 'Whitter' in browser.title

signup_username = browser.find_element_by_name('username')
signup_password = browser.find_element_by_name('password')
login_button = browser.find_element_by_name('login')

signup_username.send_keys('user1')
signup_password.send_keys('passw0rd')

login_button.click()
browser.implicitly_wait(10) # seconds

#browser.quit()
