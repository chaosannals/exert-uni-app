pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
//        flatDir {
//            dirs = setOf(rootDir.resolve("ualibs"))
////            dirs.add(rootDir.resolve("ualibs"))
////            dirs = rootDir.resolve("ualibs").listFiles().toSet()
////            dirs.forEach {
////                println("..... file: ${it.path}")
////            }
//            //api(fileTree("dir" to "libs", "include" to listOf("*.jar", "*.aar")))
//        }
    }
}

rootProject.name = "andplus"
include(":ualibs:lib5plus")
include(":ualibs:uniappv8")
include(":app")
include(":uaap")
include(":uacarlib")
include(":uabase")
