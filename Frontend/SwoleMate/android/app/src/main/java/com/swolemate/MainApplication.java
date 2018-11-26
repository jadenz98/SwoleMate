package com.swolemate;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.airbnb.android.react.maps.MapsPackage;
import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;
import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import RNAssetResizeToBase64.RNAssetResizeToBase64Package;
import expo.adapters.react.ModuleRegistryAdapter;
import com.oblador.vectoricons.VectorIconsPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import RNAssetResizeToBase64.RNAssetResizeToBase64Package;
import expo.adapters.react.ModuleRegistryAdapter;
import RNAssetResizeToBase64.RNAssetResizeToBase64Package;
import RNAssetResizeToBase64.RNAssetResizeToBase64Package;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import expo.adapters.react.ModuleRegistryAdapter;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;
import com.airbnb.android.react.maps.MapsPackage;

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
            new MapsPackage(),
            new RNGooglePlacesPackage(),
            new RNGooglePlacesPackage(),
            new RNGoogleSigninPackage(),
            new VectorIconsPackage(),
            new ImageResizerPackage(),
            new RNAssetResizeToBase64Package(),
            new ModuleRegistryAdapter(),
            new VectorIconsPackage(),
            new ImageResizerPackage(),
            new RNAssetResizeToBase64Package(),
            new ModuleRegistryAdapter(),
            new RNAssetResizeToBase64Package(),
            new RNAssetResizeToBase64Package(),
            new ImageResizerPackage(),
            new ModuleRegistryAdapter(),
            new VectorIconsPackage(),
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
    SoLoader.init(this, /* native exopackage */ false);
  }
}
