
# RentMy api integration using RentMy PHP SDK
  
  
## Integration process 
  
  
 - **Clients needs to register their business from http://rentmy.co**   
 - **Now need to collect apiKey & apiSecret from Apps & Integrations RentMy apps from rentmy store admin section.**   
 - **Now copy rentmy store integration codes in your server .** 
 - **Now run composer update**  
 - **Rename .env.example to .env** 
 - **Need to fill following configuration** 
 - **MODE = APP** 
   - BASE_URL = server root directory parth     
   - STORE_UID = store uid ( you can collect it from rentmy admin store apps section)   
   - STORE_KEY = store apiKey
   - STORE_SECET = store apiSecret
   - DEFAULT_STAT_TIME = ‘12:00’ (will be used when start time is hidden)
   - DEFAULT_END_TIME = ‘12:00’ (will be used when end time is hidden)
   - DEFAULT_STAT_TIME = ‘default’ (will be used same as start date , when end date is hidden . but client use '+1 hour' , '+1 day' in the configstart_time = '12:00' , // will be used when start time hidden) : http://client.rentmy.leaperdev.rocks

## Run merging js files & minify
 - git pull
 - npm install
 - npm run publish
 - npm  run minify
