# pokeppo
A react native mobile game which is similar to popular flappy bird game. Technology used: react native, redux,css . Implemented only for Android.

# Requirements:
1. node > v8.0.0
2. npm > v6

# Run:
react-native run-android 

## Setup In-Details:
# Add signed key to project
* Place the my-release-key.keystore file under the android/app directory in your project folder.
* Edit the file ~/.gradle/gradle.properties or android/gradle.properties, and add the following (replace ***** with the correct keystore password, alias and key password):
        MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
        MYAPP_RELEASE_KEY_ALIAS=my-key-alias
        MYAPP_RELEASE_STORE_PASSWORD=*****
        MYAPP_RELEASE_KEY_PASSWORD=*****
* Edit the file android/app/build.gradle in your project folder, and add the signing config:
	```
	android {
	    ...
	    defaultConfig { ... }
	    signingConfigs {
		release {
		    if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
		        storeFile file(MYAPP_RELEASE_STORE_FILE)
		        storePassword MYAPP_RELEASE_STORE_PASSWORD
		        keyAlias MYAPP_RELEASE_KEY_ALIAS
		        keyPassword MYAPP_RELEASE_KEY_PASSWORD
		    }
		}
	    }
	    buildTypes {
		release {
		    ...
		    signingConfig signingConfigs.release
		}
	    }
	}
	```
	
# Add firebase-admob to react project
* npm install --save react-native-firebase
* react-native link react-native-firebase
* Create firebase project from online firebase console and link project to admob
* Then click project overview in firebase web and click add app android icon for android
* At 3rd step download google-services.json created by Google Firebase and copy it to RN(react native) android/app folder. and then, click Next button to go to next step.
* open android/build.gradle in RN(react native) folder and add below code
```
	buildscript {
	  repositories {
	    google()
	    jcenter()
	  }
	  dependencies {
	    // Add this line
	    classpath 'com.google.gms:google-services:4.0.1'
	  }
	}
	...
	allprojects {
	  repositories {
	    mavenLocal()
	    google()
	    jcenter()
	    ...
	  }
	}
```
* open android/app/build.gradle in RN(react native) project and add below code.
```
	dependencies {
	    implementation project(':react-native-firebase')
	    ...
	    implementation "com.google.android.gms:play-services-base:16.0.1"
	    implementation 'com.google.firebase:firebase-core:16.0.4'
	    implementation "com.google.firebase:firebase-ads:16.0.1"
	}
```
* and add below code in the bottom of same file
```
	apply plugin: 'com.google.gms.google-services'
	com.google.gms.googleservices.GoogleServicesPlugin.config.disableVersionCheck = true
```
* last, add below source to android/app/src/main/java/com/[app name]/MainApplication.java.
```
	import io.invertase.firebase.RNFirebasePackage;
	import io.invertase.firebase.admob.RNFirebaseAdMobPackage;
	import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
	import com.google.android.gms.ads.MobileAds;

	@Override
	protected List<ReactPackage> getPackages() {
	  return Arrays.<ReactPackage>asList(
	    ...
	    new RNFirebasePackage(),
	    new RNFirebaseAdMobPackage(),
	    new RNFirebaseAnalyticsPackage(),
	    ...
	  );
	}

	@Override
	public void onCreate() {
	  super.onCreate();
	  MobileAds.initialize(this, "ca-app-pub-7987914246691031~9800293270");(app-id)
	  ...
	}
```
* AT app.js:
	- import firebase from 'react-native-firebase';
	- ...
```
	render() {
	    const Banner = firebase.admob.Banner;
	    const AdRequest = firebase.admob.AdRequest;
	    const request = new AdRequest();


	    const unitId =
	      Platform.OS === 'ios'
		? 'ca-app-pub-7987914246691031/4248107679'
		: 'ca-app-pub-7987914246691031/5729668166';(adv-id)
	    ...
	    return (
		...
		<Banner
		  unitId={unitId}
		  size={'SMART_BANNER'}
		  request={request.build()}
		  onAdLoaded={() => {
		    console.log('Advert loaded');
		  }}
		/>
	    );
```
# Change package name in react native
* modify android/app/BUCK file:
```
	android_build_config(
    	...
	    package = "package_name",
	)
	...
	android_resource(
	    ...
	    package = "package_name",
	    ...
	)
```
* modify android/app/src/main/AndroindManifest.xml file
```
	<manifest xmlns:android="http://schemas.android.com/apk/res/android"
	  package="package_name">
```
* modify android/app/src/main/java/com/ProjectName/MainActivity.java file
```
	package package_name;
```
* modify android/app/src/main/java/com/ProjectName/MainApplication.java file
```
	package package_name;
```
* modify android/app/build.gradle file
```
	defaultConfig {
	    applicationId package_name
	    ...
	}
```
# Generating the release APK
* cd android
* ./gradlew assembleRelease
* Generated apk found in /android/app/build/outputs/apk/release/apk-release.apk

# Testing the release build of your app
* react-native run-android --variant=release
