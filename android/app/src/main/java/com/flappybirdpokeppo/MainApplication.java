package com.flappybirdpokeppo;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.zmxv.RNSound.RNSoundPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.admob.RNFirebaseAdMobPackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import com.google.android.gms.ads.MobileAds;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNSoundPackage(),
            new AsyncStoragePackage(),
            new RNFirebasePackage(),
            new RNGestureHandlerPackage(),
	          new RNFirebaseAdMobPackage(),
	          new RNFirebaseAnalyticsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    MobileAds.initialize(this, "ca-app-pub-3939375362961071~8782897133");
    SoLoader.init(this, /* native exopackage */ false);
  }
}
