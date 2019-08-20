#TAF DEMO
[user] 	user01
[pwd] 	password
[env] 	testcomplete1

## 100 Rows of Execution
[Execution Suite] 	Desktop App Order Form
[Script path] 		Javascript_tests/DesktopApps/Script/OrdersApp.js
[notes] 			- uses sample Order Form app from testcomplete
					- download testcomplete samples from:
					https://support.smartbear.com/downloads/testcomplete/samples/


## multiple data groups
[Execution Suite] 	Formy Web App
[Script path] 		Webtests/Script/Formy.js
[notes] 			- has 4 datagroups with different data
					- uses chrome browser to go to formy web form

## filters
### using regular data columns
[Execution Suite] 	Web App GIO Life
[Script path] 		Webtests/Script/VerifyPremiumGIO.js
[notes] 			- has 2 filters to choose from, male and cover
					- uses firefox browser to go to GIO Life Protect Quote
					
### using taf columns
[Execution Suite] 	Formy Web App
[Script path] 		Webtests/Script/Formy.js
[notes] 			- has 2 filters to choose from, common and risk

### 2 datagroups in one filter
[Execution Suite] 	Formy Web App
[Script path] 		Webtests/Script/Formy.js
[notes] 			- common filter will filter 2 datagroups

## 1 script 2 functions
[Execution Suite] 	Ecommerce Web Test
[Script path] 		SampleStore/Script/Login.js and SampleStore/Script/Browser.js
[notes] 			- has 2 functions:
						- TCLoginValid: 	PS Ecommerce Login
						- TCLoginInvalid:	PS Invalid Login
					- default columns from taf are only for TCLoginValid
					- added /errortype to work form TCLoginInvalid
					
## Failed Test
[Execution Suite] 	Failed Test Suite
[Script path] 		FailedTests/Script/Failand Recover.js
[notes] 			- Written to fail test
