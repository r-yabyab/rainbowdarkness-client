# Rainbowdarkness (frontend)

This is the frontend client for https://rainbowdarkness.com, a mental health website that helps users track their daily mood. Users have their own personal graph, and can see how other users are feeling as well. All features are open to registered and anonymous users.

![alt text](https://i.gyazo.com/a2092446010422e02ff5bdca486ce377.png)

Users' submission are displayed using D3js. Registered-user data is pulled through MongoDB by comparing their user.sub from Auth0 to the items in the database. Non-user data is pulled by comparing the Obj.id in localstorage to the Obj.id's in the database (In the case of Obj.id being stored, they retrieve the obj.id right after they submit a mood to the database)
![alt text](https://i.gyazo.com/0b497b4d0183c30f98b71e159814226a.png)

The express backend runs in an EC2 instance. I moved it away from Vercel because it occasionally gave CORS and 429 errors out of nowhere because it wasn't running on Next.js.

I'm in the process of moving the frontend out of Vercel because they paywall'd the ability to see analytics beyond 1 month.