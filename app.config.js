export default {
  extra: {
    base_url: 'https://trustbp.tm.com.my/api/'
    // base_url: 'http://192.168.2.123/api/'
  },
  "name": "trUSt",
    "description": "New trUSt for Hijrah Project",
    "slug": "trUSt",
    "ios": {
      "bundleIdentifier": "com.tm.trUSt",
      "supportsTablet": true,
      "buildNumber": "3.0.6",
      "infoPlist": {
        "NSLocationWhenInUseUsageDescription": "trUSt app requires your location for your team and supervisor able to track your working location",
        "NSCameraUsageDescription": "trUSt would like to use your Camera to scan barcode in workspace area"
      },
      "config": {
        "googleMapsApiKey": "AIzaSyDN7HeU6Fup4nuDDheP4__O6t7-K0TKa94",
        "googleSignIn": {
          "reservedClientId": "com.googleusercontent.apps.510205589026-pkkg0m89n8oae8q316i04hsq4rpnaabe"
        }
      }
    },
    "android": {
      "package": "com.tm.trUSt",
      "versionCode": 8,
      "googleServicesFile": "./google-services.json",
      "config": {
        "googleMaps": {
          "apiKey": "AIzaSyCKOjpWsq34EXU2Ucc7hCS-Ivhq4-67tIk"
        }
      },
      "permissions": [
        "CAMERA",
        "ACCESS_FINE_LOCATION"
      ]
    },
    "privacy": "public",
    "platforms": [
      "ios",
      "android",
      "web"
    ],
    "version": "3.0.8",
    "orientation": "portrait",
    "icon": "./assets/TrustNew.png",
    "splash": {
      "image": "./assets/TrustNew.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "notification": {
      "icon": "./assets/TrustNew.png"
    },
    "updates": {
      "fallbackToCacheTimeout": 15000,
      "checkAutomatically": "ON_LOAD",
      "enabled": true
    },
    "assetBundlePatterns": [
      "**/*"
    ]
}