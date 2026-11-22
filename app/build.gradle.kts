plugins { id("com.android.application") }
import java.util.Properties

val releaseSigning=Properties(); val signingFile=rootProject.file("signing.properties")
if(signingFile.exists()) signingFile.inputStream().use(releaseSigning::load)
android {
  namespace="net.softm.bunyanghannun"; compileSdk=36
  defaultConfig { applicationId="net.softm.bunyanghannun"; minSdk=24; targetSdk=36; versionCode=1; versionName="1.0.0"; buildConfigField("String","WEB_URL","\"https://softm.github.io/bunyanghannun/\"") }
  buildFeatures { buildConfig=true }
  signingConfigs { create("release") { if(signingFile.exists()){ storeFile=file(releaseSigning.getProperty("storeFile")); storePassword=releaseSigning.getProperty("storePassword"); keyAlias=releaseSigning.getProperty("keyAlias"); keyPassword=releaseSigning.getProperty("keyPassword") } } }
  buildTypes { release { isMinifyEnabled=true; isShrinkResources=true; proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"),"proguard-rules.pro"); if(signingFile.exists()) signingConfig=signingConfigs.getByName("release") } }
  compileOptions { sourceCompatibility=JavaVersion.VERSION_17; targetCompatibility=JavaVersion.VERSION_17 }
}
dependencies { implementation("androidx.webkit:webkit:1.17.1"); implementation("com.github.softm:hannun-in-app-update-android:1.0.0"); implementation("com.github.softm:hannun-admob-android:1.0.5"); testImplementation("junit:junit:4.13.2") }
val syncWebAssets by tasks.registering(Sync::class){ from(rootProject.file("../bunyanghannun/public")); into(layout.projectDirectory.dir("src/main/assets/www")); exclude("data/live.json") }
tasks.matching{it.name=="preBuild"}.configureEach{dependsOn(syncWebAssets)}
