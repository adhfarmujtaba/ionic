// src/NewsList.tsx
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
} from '@ionic/react';

interface Post {
  id: number;
  title: string;
  excerpt: string;
}

const NewsList: React.FC = () => {
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
        setPosts(data.posts); // Adjust based on actual API response structure
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
          <p>Loading...</p>
        ) : (
          <IonList>
            {posts.map((post) => (
              <IonItem key={post.id}>
                <IonLabel>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default NewsList;
