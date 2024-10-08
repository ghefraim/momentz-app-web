"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useAuthUser from "@/hooks/useUser";
import { fetchUser, fetchUserGalleries } from "@/utils/supabase/queries";
import { Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Galleries = () => {
  const { authUser, authLoading, authError } = useAuthUser();
  const [user, setUser] = useState(null);
  const [userGalleries, setUserGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (authUser) {
    }

    async function fetchData() {
      fetchUser(authUser.id).then((data) => {
        if (data) {
          setUser(data);
        } else {
          router.push("/login");
        }

        //can be improved by using a single query or parallel queries (Promise.all)
        fetchUserGalleries(authUser.id).then((data) => {
          setUserGalleries(data);
        });

        setLoading(false);
      });
    }

    if (!authLoading && authUser) {
      fetchData();
    }
  }, [authLoading]);

  return (
    <>
      {authUser && !authUser.is_anonymous && <Navbar />}

      <div className="container mt-4">
        {user && <h1 className="text-3xl font-bold mb-6">Your galleries</h1>}
        {userGalleries.length > 0 && user ? (
          <>
            <div>
              <p>{user.name}, here are your galleries</p>
              <Button variant="secondary" className="mt-4">
                <Link href="/create-gallery">Create New Gallery</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {userGalleries.map((gallery) => (
                <Card key={gallery.id} className="">
                  <div className="p-4">
                    <h2 className="text-xl font-bold">{gallery.title}</h2>
                    <p className="text-muted-foreground"># {gallery.code}</p>
                    <p>{gallery.description}</p>
                  </div>
                  <div className="p-4 bg-muted flex">
                    <Link href={`/gallery/${gallery.code}`}>
                      <Button>View gallery</Button>
                    </Link>
                    <Button disabled variant="ghost-destructive" className="">
                      <Trash size={16} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div>
            <p>It seems like you don&apos;t have any galleries yet</p>
            <Button className="mt-4">
              <Link href="/create-gallery">Create a gallery</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Galleries;
