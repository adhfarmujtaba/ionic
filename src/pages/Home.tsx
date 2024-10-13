import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonImg,
  IonSkeletonText,
} from '@ionic/react';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  meta_description: string;
  slug: string; // Add slug field
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const url = 'https://blog.tourismofkashmir.com/apis?posts&page=1';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); // Log the API response for debugging
        setPosts(data); // Directly use the response array
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>News</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loading ? (
          <IonList>
            {Array.from({ length: 5 }).map((_, index) => (
              <IonItem key={index}>
                <div style={{ width: '100px', height: '100px', marginRight: '10px' }}>
                  <IonSkeletonText animated style={{ width: '100%', height: '100%' }} />
                </div>
                <IonLabel>
                  <IonSkeletonText animated style={{ width: '80%', marginBottom: '4px' }} />
                  <IonSkeletonText animated style={{ width: '60%', marginBottom: '4px' }} />
                  <IonSkeletonText animated style={{ width: '90%' }} />
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        ) : (
          <IonList>
            {Array.isArray(posts) && posts.length > 0 ? (
              posts.map((post) => (
                <IonItem key={post.id} button={true} routerLink={`/article/${post.slug}`}>
                  <IonImg src={post.image} alt={post.title} style={{ width: '100px', height: 'auto', marginRight: '10px' }} />
                  <IonLabel>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <p>{post.meta_description}</p>
                  </IonLabel>
                </IonItem>
              ))
            ) : (
              <p>No posts available.</p>
            )}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
