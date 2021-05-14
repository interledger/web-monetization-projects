.class final Lb/a/a/a/j/a;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Landroid/os/Parcelable$ClassLoaderCreator;


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Lb/a/a/a/j/b;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x8
    name = null
.end annotation

.annotation system Ldalvik/annotation/Signature;
    value = {
        "Ljava/lang/Object;",
        "Landroid/os/Parcelable$ClassLoaderCreator<",
        "Lb/a/a/a/j/b;",
        ">;"
    }
.end annotation


# direct methods
.method constructor <init>()V
    .locals 0

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public createFromParcel(Landroid/os/Parcel;)Lb/a/a/a/j/b;
    .locals 2

    new-instance v0, Lb/a/a/a/j/b;

    const/4 v1, 0x0

    invoke-direct {v0, p1, v1, v1}, Lb/a/a/a/j/b;-><init>(Landroid/os/Parcel;Ljava/lang/ClassLoader;Lb/a/a/a/j/a;)V

    return-object v0
.end method

.method public createFromParcel(Landroid/os/Parcel;Ljava/lang/ClassLoader;)Lb/a/a/a/j/b;
    .locals 2

    new-instance v0, Lb/a/a/a/j/b;

    const/4 v1, 0x0

    invoke-direct {v0, p1, p2, v1}, Lb/a/a/a/j/b;-><init>(Landroid/os/Parcel;Ljava/lang/ClassLoader;Lb/a/a/a/j/a;)V

    return-object v0
.end method

.method public bridge synthetic createFromParcel(Landroid/os/Parcel;)Ljava/lang/Object;
    .locals 0

    invoke-virtual {p0, p1}, Lb/a/a/a/j/a;->createFromParcel(Landroid/os/Parcel;)Lb/a/a/a/j/b;

    move-result-object p1

    return-object p1
.end method

.method public bridge synthetic createFromParcel(Landroid/os/Parcel;Ljava/lang/ClassLoader;)Ljava/lang/Object;
    .locals 0

    invoke-virtual {p0, p1, p2}, Lb/a/a/a/j/a;->createFromParcel(Landroid/os/Parcel;Ljava/lang/ClassLoader;)Lb/a/a/a/j/b;

    move-result-object p1

    return-object p1
.end method

.method public newArray(I)[Lb/a/a/a/j/b;
    .locals 0

    new-array p1, p1, [Lb/a/a/a/j/b;

    return-object p1
.end method

.method public bridge synthetic newArray(I)[Ljava/lang/Object;
    .locals 0

    invoke-virtual {p0, p1}, Lb/a/a/a/j/a;->newArray(I)[Lb/a/a/a/j/b;

    move-result-object p1

    return-object p1
.end method
