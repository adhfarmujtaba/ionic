// src/Article.tsx
import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonBackButton,
  IonButtons,
  IonLabel,
  IonSkeletonText,
} from '@ionic/react';
import { useParams } from 'react-router-dom';

interface Post {
  title: string;
  content: string;
  meta_description: string;
  image: string;
}

const Article: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const url = `https://blog.tourismofkashmir.com/apis?post_slug=${slug}`;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPost(data); // Assume data contains the post
      } catch (error) {
        console.error('Failed to fetch post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{loading ? 'Loading...' : post?.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loading ? (
          <div style={{ padding: '16px' }}>
            <IonSkeletonText animated style={{ width: '100%', height: '200px', marginBottom: '16px' }} />
            <IonSkeletonText animated style={{ width: '70%', height: '24px', marginBottom: '8px' }} />
            <IonSkeletonText animated style={{ width: '90%', height: '16px', marginBottom: '4px' }} />
            <IonSkeletonText animated style={{ width: '80%', height: '16px', marginBottom: '4px' }} />
            <IonSkeletonText animated style={{ width: '60%', height: '16px', marginBottom: '4px' }} />
            <IonSkeletonText animated style={{ width: '70%', height: '24px', marginBottom: '8px' }} />
            <IonSkeletonText animated style={{ width: '90%', height: '16px', marginBottom: '4px' }} />
            <IonSkeletonText animated style={{ width: '80%', height: '16px', marginBottom: '4px' }} />
            <IonSkeletonText animated style={{ width: '60%', height: '16px', marginBottom: '4px' }} />
            <IonSkeletonText animated style={{ width: '70%', height: '24px', marginBottom: '8px' }} />
            <IonSkeletonText animated style={{ width: '90%', height: '16px', marginBottom: '4px' }} />
            <IonSkeletonText animated style={{ width: '80%', height: '16px', marginBottom: '4px' }} />
            <IonSkeletonText animated style={{ width: '60%', height: '16px', marginBottom: '4px' }} />
            <IonSkeletonText animated style={{ width: '70%', height: '24px', marginBottom: '8px' }} />
            <IonSkeletonText animated style={{ width: '90%', height: '16px', marginBottom: '4px' }} />
            <IonSkeletonText animated style={{ width: '80%', height: '16px', marginBottom: '4px' }} />
            <IonSkeletonText animated style={{ width: '60%', height: '16px', marginBottom: '4px' }} />
            <IonSkeletonText animated style={{ width: '70%', height: '24px', marginBottom: '8px' }} />
            <IonSkeletonText animated style={{ width: '90%', height: '16px', marginBottom: '4px' }} />
            <IonSkeletonText animated style={{ width: '80%', height: '16px', marginBottom: '4px' }} />
            <IonSkeletonText animated style={{ width: '60%', height: '16px', marginBottom: '4px' }} />
            <IonSkeletonText animated style={{ width: '70%', height: '24px', marginBottom: '8px' }} />
            <IonSkeletonText animated style={{ width: '90%', height: '16px', marginBottom: '4px' }} />
            <IonSkeletonText animated style={{ width: '80%', height: '16px', marginBottom: '4px' }} />
            <IonSkeletonText animated style={{ width: '60%', height: '16px', marginBottom: '4px' }} />
            <IonSkeletonText animated style={{ width: '70%', height: '24px', marginBottom: '8px' }} />
            <IonSkeletonText animated style={{ width: '90%', height: '16px', marginBottom: '4px' }} />
            <IonSkeletonText animated style={{ width: '80%', height: '16px', marginBottom: '4px' }} />
            <IonSkeletonText animated style={{ width: '60%', height: '16px', marginBottom: '4px' }} />
            
          </div>
        ) : post ? (
          <div>
            <img src={post.image} alt={post.title} style={{ width: '100%', height: 'auto' }} />
            <IonLabel>
              <h2>{post.title}</h2>
              <p>{post.meta_description}</p>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </IonLabel>
          </div>
        ) : (
          <p>No post found.</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Article;
