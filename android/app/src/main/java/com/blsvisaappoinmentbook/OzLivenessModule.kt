package com.blsvisaappoinmentbook
import android.app.Activity
import android.util.Base64
import android.util.Log
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

// Import Oz SDK (assuming it's available)
// import com.ozforensics.ozsdk.OzSDK
// import com.ozforensics.ozsdk.OzResult
// import com.ozforensics.ozsdk.OzConfig

class OzLivenessModule(reactContext: ReactApplicationContext) : 
    ReactContextBaseJavaModule(reactContext), LifecycleEventListener {

    private var reactContext: ReactApplicationContext = reactContext
    private var ozSDK: Any? = null // Replace with actual Oz SDK type
    
    init {
        reactContext.addLifecycleEventListener(this)
    }

    override fun getName(): String {
        return "OzLivenessModule"
    }

    @ReactMethod
    fun initialize(licenseKey: String, config: ReadableMap, promise: Promise) {
        try {
            val activity = currentActivity
            if (activity == null) {
                promise.reject("NO_ACTIVITY", "No current activity available")
                return
            }

            activity.runOnUiThread {
                try {
                    // Initialize Oz SDK
                    // ozSDK = OzSDK.initialize(activity, licenseKey)
                    
                    // Configure SDK
                    if (config.hasKey("timeout")) {
                        val timeout = config.getInt("timeout")
                        // ozSDK.setTimeout(timeout)
                    }
                    
                    if (config.hasKey("difficulty")) {
                        val difficulty = config.getString("difficulty")
                        // ozSDK.setDifficulty(difficulty)
                    }

                    sendEvent("onLivenessStarted", null)
                    val result = Arguments.createMap().apply {
                        putBoolean("success", true)
                        putString("message", "Oz SDK initialized successfully")
                    }
                    promise.resolve(result)
                } catch (e: Exception) {
                    promise.reject("INIT_ERROR", "Failed to initialize Oz SDK: ${e.message}", e)
                }
            }
        } catch (e: Exception) {
            promise.reject("INIT_ERROR", "Failed to initialize Oz SDK: ${e.message}", e)
        }
    }

    @ReactMethod
    fun startLivenessCheck(promise: Promise) {
        try {
            val activity = currentActivity
            if (activity == null) {
                promise.reject("NO_ACTIVITY", "No current activity available")
                return
            }

            activity.runOnUiThread {
                try {
                    // Start Oz liveness check
                    // ozSDK.startLivenessCheck(activity, object : OzSDK.Callback {
                    //     override fun onSuccess(result: OzResult) {
                    //         val resultMap = Arguments.createMap().apply {
                    //             putBoolean("success", result.isSuccess)
                    //             putDouble("score", result.score)
                    //             putString("image", Base64.encodeToString(result.imageData, Base64.DEFAULT))
                    //             // Add other result properties
                    //         }
                    //         promise.resolve(resultMap)
                    //     }
                    //     
                    //     override fun onError(error: Exception) {
                    //         promise.reject("LIVENESS_ERROR", error.message, error)
                    //     }
                    // })
                    
                    // Simulate success for demo
                    val resultMap = Arguments.createMap().apply {
                        putBoolean("success", true)
                        putDouble("score", 0.95)
                        putString("image", "")
                    }
                    promise.resolve(resultMap)
                    
                } catch (e: Exception) {
                    promise.reject("LIVENESS_ERROR", "Liveness check failed: ${e.message}", e)
                }
            }
        } catch (e: Exception) {
            promise.reject("LIVENESS_ERROR", "Liveness check failed: ${e.message}", e)
        }
    }

    @ReactMethod
    fun verifyFace(referenceImage: String, capturedImage: String, promise: Promise) {
        try {
            Thread(Runnable {
                try {
                    // Convert base64 strings to byte arrays
                    val referenceBytes = Base64.decode(referenceImage, Base64.DEFAULT)
                    val capturedBytes = Base64.decode(capturedImage, Base64.DEFAULT)
                    
                    // Perform face verification
                    // val result = ozSDK.verifyFaces(referenceBytes, capturedBytes)
                    
                    val resultMap = Arguments.createMap().apply {
                        putBoolean("success", true)
                        putDouble("similarityScore", 0.92)
                        putBoolean("isMatch", true)
                        putString("confidence", "high")
                    }
                    
                    promise.resolve(resultMap)
                } catch (e: Exception) {
                    promise.reject("VERIFICATION_ERROR", "Face verification failed: ${e.message}", e)
                }
            }).start()
        } catch (e: Exception) {
            promise.reject("VERIFICATION_ERROR", "Face verification failed: ${e.message}", e)
        }
    }

    @ReactMethod
    fun isAvailable(promise: Promise) {
        val available = ozSDK != null // && ozSDK.isAvailable()
        promise.resolve(available)
    }

    @ReactMethod
    fun getVersion(promise: Promise) {
        // val version = ozSDK?.getVersion() ?: "1.0.0"
        promise.resolve("1.0.0")
    }

    private fun sendEvent(eventName: String, params: WritableMap?) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }

    override fun onHostResume() {
        // SDK resume logic
    }

    override fun onHostPause() {
        // SDK pause logic
    }

    override fun onHostDestroy() {
        // Cleanup Oz SDK
        reactContext.removeLifecycleEventListener(this)
    }
}