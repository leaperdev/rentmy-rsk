
# RentMy api integration using RentMy PHP SDK 
  
  
## Integration process 
  
  
 - Clients needs to register their business from http://rentmy.co   
 - Now need to collect apiKey & apiSecret from Apps & Integrations RentMy apps from rentmy store admin section.   
 - Clone or copy this sample code. 
 - Now run composer update
 - Rename .env.example to .env
 - Need to fill following configuration
   - THEME = default (default theme name, if new theme added, then theme name needs to be added here)
   - LANGUAGE = en  ( default language file & static content. file location - themes/default/assets/local/en.php)
   - BASE_URL = server root directory parth     
   - STORE_UID = store uid ( you can collect it from rentmy admin store apps section)   
   - STORE_KEY = store apiKey
   - STORE_SECET = store apiSecret
   - DEFAULT_STAT_TIME = ‘12:00’ (will be used when start time is hidden)
   - DEFAULT_END_TIME = ‘12:00’ (will be used when end time is hidden)
   - DEFAULT_STAT_TIME = ‘default’ (will be used same as start date , when end date is hidden . but client use '+1 hour' , '+1 day' in the configstart_time = '12:00' , // will be used when start time hidden)

## Add new theme
  - Create a new directory under themes directory. Theme name should be unique & lower cased.
  - Copy all files from default theme.
  - Change the theme files as necessary. specially css, js , images
  - New theme name should be added in .env file 
  
## Setup config for assets/js/css
Using Configuration file css, js can be configured.
 - theme : [ theme name & details ]
 - css 
   - fontsIcons: [ array of font icon url]
   - global: [ globally loaded css files]
   - home / page_name :[ array of css files , loaded on different pages]
 - js
   - global: [ globally loaded js files]
   - home / page_name :[ array of js files , loaded on different pages]  
 - settings
   - excludeHeader : [ list of pages where global header will not ba added]
   - excludeFooter : [ list of pages where global footer will not be added]
   - excludeCart : [ list of pages where mini cart will not be added ]

