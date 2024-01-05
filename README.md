# SkiTrafficCalculator
Application that tests a user the traffic to get to their favorite ski resorts depending on their current location and what ski pass they purchased. 


I found google offers free monthly use of their route/traffic api. Its free as long as I dont exceed like, 28,000 api calls in a month. Using this I can have the user give their current location (Denver or Salt Lake City areas are the only real options), tell me which ski pass they purchased (ikon or epic) and then hit the api to return real time travel times and traffic data to each of the ikon or epic resorts. I'll sort and return the data in a useful manor letting them know the resorts they can get to the fastest. 

I'll create a nice landing page for the theoretical users that looks pretty and is a fun site to visit. 

List of resorts:
  Ikon: 
    Colorado: Winter Park, Copper Mountain, Arapaho Basin, Eldora Mountain, Aspen Snowmass, Steamboat Springs, Taos, Jackson Hole
    Utah: Solitude, Alta, Snowbird, Deer Valley, Snowbasin, Brighton.
  Epic: 
    Colorado: Vail, Beaver Creek, Breckenridge, Keystone, Telluride, Crested Butte
    Utah: Park City

Have the user enter current location (city/state), might have to convert this to long and lat but we'll see what the api requires. 
Pre-sort the resorts based on their pass type (or both), hit the api for each resort, put results into an array, sort the array, display the information. 
