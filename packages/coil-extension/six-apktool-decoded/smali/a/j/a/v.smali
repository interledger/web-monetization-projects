.class final La/j/a/v;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Landroid/os/Parcelable$Creator;


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = La/j/a/w;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x8
    name = null
.end annotation

.annotation system Ldalvik/annotation/Signature;
    value = {
        "Ljava/lang/Object;",
        "Landroid/os/Parcelable$Creator<",
        "La/j/a/w;",
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
.method public createFromParcel(Landroid/os/Parcel;)La/j/a/w;
    .locals 1

    new-instance v0, La/j/a/w;

    invoke-direct {v0, p1}, La/j/a/w;-><init>(Landroid/os/Parcel;)V

    return-object v0
.end method

.method public bridge synthetic createFromParcel(Landroid/os/Parcel;)Ljava/lang/Object;
    .locals 0

    invoke-virtual {p0, p1}, La/j/a/v;->createFromParcel(Landroid/os/Parcel;)La/j/a/w;

    move-result-object p1

    return-object p1
.end method

.method public newArray(I)[La/j/a/w;
    .locals 0

    new-array p1, p1, [La/j/a/w;

    return-object p1
.end method

.method public bridge synthetic newArray(I)[Ljava/lang/Object;
    .locals 0

    invoke-virtual {p0, p1}, La/j/a/v;->newArray(I)[La/j/a/w;

    move-result-object p1

    return-object p1
.end method
