{
    "rules": {
          ".read": "auth.uid != null",
            "cats": {
                "$cat_id" : {
                      ".write": "auth.uid != null && (auth.provider !== 'anonymous' || (!data.exists()))"
                }
            },
            "allCats": {
                "$allCat_id" : {
                      ".write": "auth.uid != null && (auth.provider !== 'anonymous' || (!data.exists()))"
                    }
            },
              "users": {
                    "$uid" : {
                      ".write": "auth.uid === $uid"
                    }
              }
                }
              }