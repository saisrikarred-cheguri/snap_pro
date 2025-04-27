import { ID, ImageGravity, Query } from "appwrite";

import { INewUser, INewPost, IUpdatePost, IUpdateUser } from "@/types";
import { account, appwriteConfig, avatars, databases, storage } from "./config";

export async function  createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
        )

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            email: newAccount.email,
            name: newAccount.name,
            imageUrl: avatarUrl,
            username: user.username,
        })


        return newUser;
    }catch (error){
        console.log(error)
        return error
    }
}

export async function updateUserAccount(user: IUpdateUser) {
    try {
        
        console.log('updateUserAccount')
        console.log(user)

        const hasFileToUpdate  = user.file.length > 0
      
        let image = {
            imageUrl: user.imageUrl,
            imageId: user.imageId,
        }
        if (hasFileToUpdate){
            const uploadedFile = await uploadFile(user.file[0]);
        
            if (!uploadedFile) throw Error;
            const fileUrl = getFilePreview(uploadedFile.$id);
            console.log('fileUrl')
            console.log(fileUrl)
            if (!fileUrl) {
              await deleteFile(uploadedFile.$id);
              throw Error;
            }

            image = {
                ...image,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id
            }
        }

        const updatedUser = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            user.$id,
            {
                name: user.name,
                username: user.username,
                imageUrl: image.imageUrl,
                imageId: image.imageId,
                bio: user.bio
            }
        )
    
        return updatedUser

    } catch (error) {
        console.log(error)
        return error
    }
    
}

export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string; 
}){

    try {
        console.log(user)
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
        )
        return newUser
    } catch (error) {
        console.log('error happening in document creation')
        console.log(error)
    }
}

export async function signInAccount(user: {email: string; password: string}) {
    try {
        const session = await account.createEmailPasswordSession(user.email, user.password);
        return session
    } catch (error) {
        console.log(error)
    }   
}

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id) ]
        )
        if(!currentUser) throw Error;
        return currentUser.documents[0];
    }
    catch(error){
        console.log(error)
        console.log('error in getCurrentUser')
    }
}

export async function getUserById(userId: string) {
    console.log('getUserById')
    try {
        
        const user = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('$id', userId) ]
        )
        console.log(user)
        if(!user) throw Error;
        return user.documents[0];
    }
    catch(error){
        console.log(error)
        console.log('error in getCurrentUser')
    }
}

export async function signOutAccount() {
    try {
        const deleteSession = await account.deleteSession("current")
        console.log(deleteSession)
        return deleteSession
    } catch (error) {
        console.log(error)
    }   
}

export async function createPost(post: INewPost) {
    try {
      // Upload file to appwrite storage
      console.log('uploadFile')
      const uploadedFile = await uploadFile(post.file[0]);
  
      if (!uploadedFile) throw Error;
  
      // Get file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      console.log('fileUrl')
      console.log(fileUrl)
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
  
      // Convert tags into array
      const tags = post.tags?.replace(/ /g, "").split(",") || [];
  
      // Create post
      console.log({
        creator: post.userId,
          caption: post.caption,
          imageUrl: fileUrl,
          imageId: uploadedFile.$id,
          location: post.location,
          tags: tags,
      })
      const newPost = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        ID.unique(),
        {
          creator: post.userId,
          caption: post.caption,
          imageUrl: fileUrl,
          imageId: uploadedFile.$id,
          location: post.location,
          tags: tags,
        }
      );
  
      if (!newPost) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
  
      return newPost;
    } catch (error) {
      console.log(error);
    }
  }

export async function uploadFile(file: File){
    try {
        const uploadedFile = await storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),
        file
        );

        return uploadedFile
    } catch (error) {
        console.log(error)
    }
}

export function getFilePreview(fileId: string) {
    try {
        const fileUrl = storage.getFilePreview(
            appwriteConfig.storageId,
            fileId,
            // 2000,
            // 2000,
            // ImageGravity.Top,
            // 100,
        )
        if (!fileUrl) throw Error
        return fileUrl;
    } catch (error) {
        console.log(error)
    }
}

export async function deleteFile(fileId: string) {
    try {
        await storage.deleteFile(appwriteConfig.storageId, fileId);
        return {status: 'ok' }
    } catch (error) {
        console.log(error)
    }
}

export async function getRecentPosts(){
     const posts = await databases.listDocuments(
         appwriteConfig.databaseId,
         appwriteConfig.postCollectionId,
         [Query.orderDesc('$createdAt'), Query.limit(20)]
     )

     if(!posts) throw Error
    
     return posts
}

export async function likePost(postId: string, likesArray: string[]){
    try {
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId,
            {
                likes: likesArray 
            }
        ) 
        if(!updatedPost) throw Error
        return updatedPost
    } catch (error) {
        console.log(error)
    }
}   

export async function savePost(postId: string, userId: string){
    try {
        console.log(postId)
        console.log('userId')
        console.log(userId)
        const updatedPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            ID.unique(),
            {
                user: userId,
                post: postId,
            }
        ) 
        if(!updatedPost) throw Error
        return updatedPost
    } catch (error) {
        console.log(error)
    }
}   

export async function deleteSavedPost(savedRecordId: string){
    try {
        const statusCode = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            savedRecordId
        ) 
        if(!statusCode) throw Error
        return {status: 'ok'}
    } catch (error) {
        console.log(error)
    }
}   

export async function getPostById(postId: string) {
    try {
        const post = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId
        )
        return post
    } catch (error) {
        console.log(error)
    }
    
}


export async function updatePost(post: IUpdatePost) {
    try {
        // Upload file to appwrite storage
        const hasFileToUpdate  = post.file.length > 0
      
        let image = {
            imageUrl: post.imageUrl,
            imageId: post.imageId,
        }
        if (hasFileToUpdate){
            const uploadedFile = await uploadFile(post.file[0]);
        
            if (!uploadedFile) throw Error;
            const fileUrl = getFilePreview(uploadedFile.$id);
            console.log('fileUrl')
            console.log(fileUrl)
            if (!fileUrl) {
              await deleteFile(uploadedFile.$id);
              throw Error;
            }

            image = {
                ...image,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id
            }
        }
      
  
      // Get file url
  
      // Convert tags into array
      const tags = post.tags?.replace(/ /g, "").split(",") || [];
  
      // Update post
      const UpdatedPost = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        post.postId,
        {
          caption: post.caption,
          imageUrl: image.imageUrl,
          imageId: image.imageId,
          location: post.location,
          tags: tags,
        }
      );
  
      if (!UpdatedPost) {
        await deleteFile(post.imageId);
        throw Error;
      }
  
      return UpdatedPost;
    } catch (error) {
      console.log(error);
    }
  }


export async function deletePost(postId: string, imageId: string) {
    if(!postId || !imageId) throw Error;
    try {
        const deletePost = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId
        ) 

        return {status: 'ok'}
    } catch (error) {
        console.log(error)
    }
    
}

export async function getInfinitePosts({pageParam}: {pageParam: number}) {
    const queries: any[] = [Query.orderDesc('$updatedAt'), Query.limit(10)]
    if (pageParam){
        queries.push(Query.cursorAfter(pageParam.toString()));
    }
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            queries
        )

        if(!posts){
            throw Error;
        }
        return posts;

    } catch (error) {
        console.log(error)
        return { documents: [] };
    }
    
}


export async function searchPosts(searchTerm: string) {
    
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            [Query.search('caption', searchTerm) ]
        )

        if(!posts){
            throw Error;
        }
        return posts;

    } catch (error) {
        console.log(error)
    }
    
}

export async function getUsers(limit?: number) {
    try {
        const queries = [Query.orderDesc('$createdAt')];

        if(limit){
            queries.push(Query.limit(limit))
        }
        const users = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            queries
        )
        
        if(!users){
            throw Error
        }
        console.log(users)
        return users;

    } catch (error) {
        console.log(error)
    }
    
}

export async function getSavedPosts(){
    try {
        const currentAccount = await account.get();
        const allSavedPosts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            [ Query.orderDesc('$createdAt')]
        )

        console.log(allSavedPosts)
        
        if (!allSavedPosts || allSavedPosts.total === 0) {
            console.log("No posts found saved.");
            return [];
        }

        // Manually filter posts where the creator's accountId matches the current user
        const savedPosts = allSavedPosts.documents
        ?.filter(({user}) => user?.accountId === currentAccount?.$id)
        .map(({post}) => post);

        return savedPosts;
        
    } catch (error) {
        console.log(error)
        console.log('error in getCurrentUser Posts saved')
    }
}

export async function getUserPosts(userId: string){
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            [Query.orderDesc('$createdAt')]
        )

        if (!posts || posts.total === 0) {
            console.log("No posts found.");
            return [];
        }

        // Manually filter posts where the creator's accountId matches the current user
        const userPosts = posts.documents.filter(post => 
            post.creator?.$id === userId
        );

        return userPosts;
    } catch (error) {
        console.log(error)
        console.log('error in getUserPosts')
    }
}