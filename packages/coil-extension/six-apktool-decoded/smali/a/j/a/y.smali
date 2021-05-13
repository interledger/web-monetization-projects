.class final La/j/a/y;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Landroid/os/Parcelable;


# static fields
.field public static final CREATOR:Landroid/os/Parcelable$Creator;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Landroid/os/Parcelable$Creator<",
            "La/j/a/y;",
            ">;"
        }
    .end annotation
.end field


# instance fields
.field final a:Ljava/lang/String;

.field final b:I

.field final c:Z

.field final d:I

.field final e:I

.field final f:Ljava/lang/String;

.field final g:Z

.field final h:Z

.field final i:Landroid/os/Bundle;

.field final j:Z

.field k:Landroid/os/Bundle;

.field l:La/j/a/g;


# direct methods
.method static constructor <clinit>()V
    .locals 1

    new-instance v0, La/j/a/x;

    invoke-direct {v0}, La/j/a/x;-><init>()V

    sput-object v0, La/j/a/y;->CREATOR:Landroid/os/Parcelable$Creator;

    return-void
.end method

.method constructor <init>(La/j/a/g;)V
    .locals 1

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    invoke-virtual {p1}, Ljava/lang/Object;->getClass()Ljava/lang/Class;

    move-result-object v0

    invoke-virtual {v0}, Ljava/lang/Class;->getName()Ljava/lang/String;

    move-result-object v0

    iput-object v0, p0, La/j/a/y;->a:Ljava/lang/String;

    iget v0, p1, La/j/a/g;->g:I

    iput v0, p0, La/j/a/y;->b:I

    iget-boolean v0, p1, La/j/a/g;->o:Z

    iput-boolean v0, p0, La/j/a/y;->c:Z

    iget v0, p1, La/j/a/g;->z:I

    iput v0, p0, La/j/a/y;->d:I

    iget v0, p1, La/j/a/g;->A:I

    iput v0, p0, La/j/a/y;->e:I

    iget-object v0, p1, La/j/a/g;->B:Ljava/lang/String;

    iput-object v0, p0, La/j/a/y;->f:Ljava/lang/String;

    iget-boolean v0, p1, La/j/a/g;->E:Z

    iput-boolean v0, p0, La/j/a/y;->g:Z

    iget-boolean v0, p1, La/j/a/g;->D:Z

    iput-boolean v0, p0, La/j/a/y;->h:Z

    iget-object v0, p1, La/j/a/g;->i:Landroid/os/Bundle;

    iput-object v0, p0, La/j/a/y;->i:Landroid/os/Bundle;

    iget-boolean p1, p1, La/j/a/g;->C:Z

    iput-boolean p1, p0, La/j/a/y;->j:Z

    return-void
.end method

.method constructor <init>(Landroid/os/Parcel;)V
    .locals 3

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    invoke-virtual {p1}, Landroid/os/Parcel;->readString()Ljava/lang/String;

    move-result-object v0

    iput-object v0, p0, La/j/a/y;->a:Ljava/lang/String;

    invoke-virtual {p1}, Landroid/os/Parcel;->readInt()I

    move-result v0

    iput v0, p0, La/j/a/y;->b:I

    invoke-virtual {p1}, Landroid/os/Parcel;->readInt()I

    move-result v0

    const/4 v1, 0x1

    const/4 v2, 0x0

    if-eqz v0, :cond_0

    move v0, v1

    goto :goto_0

    :cond_0
    move v0, v2

    :goto_0
    iput-boolean v0, p0, La/j/a/y;->c:Z

    invoke-virtual {p1}, Landroid/os/Parcel;->readInt()I

    move-result v0

    iput v0, p0, La/j/a/y;->d:I

    invoke-virtual {p1}, Landroid/os/Parcel;->readInt()I

    move-result v0

    iput v0, p0, La/j/a/y;->e:I

    invoke-virtual {p1}, Landroid/os/Parcel;->readString()Ljava/lang/String;

    move-result-object v0

    iput-object v0, p0, La/j/a/y;->f:Ljava/lang/String;

    invoke-virtual {p1}, Landroid/os/Parcel;->readInt()I

    move-result v0

    if-eqz v0, :cond_1

    move v0, v1

    goto :goto_1

    :cond_1
    move v0, v2

    :goto_1
    iput-boolean v0, p0, La/j/a/y;->g:Z

    invoke-virtual {p1}, Landroid/os/Parcel;->readInt()I

    move-result v0

    if-eqz v0, :cond_2

    move v0, v1

    goto :goto_2

    :cond_2
    move v0, v2

    :goto_2
    iput-boolean v0, p0, La/j/a/y;->h:Z

    invoke-virtual {p1}, Landroid/os/Parcel;->readBundle()Landroid/os/Bundle;

    move-result-object v0

    iput-object v0, p0, La/j/a/y;->i:Landroid/os/Bundle;

    invoke-virtual {p1}, Landroid/os/Parcel;->readInt()I

    move-result v0

    if-eqz v0, :cond_3

    goto :goto_3

    :cond_3
    move v1, v2

    :goto_3
    iput-boolean v1, p0, La/j/a/y;->j:Z

    invoke-virtual {p1}, Landroid/os/Parcel;->readBundle()Landroid/os/Bundle;

    move-result-object p1

    iput-object p1, p0, La/j/a/y;->k:Landroid/os/Bundle;

    return-void
.end method


# virtual methods
.method public a(La/j/a/l;La/j/a/j;La/j/a/g;La/j/a/u;Landroidx/lifecycle/u;)La/j/a/g;
    .locals 3

    iget-object v0, p0, La/j/a/y;->l:La/j/a/g;

    if-nez v0, :cond_3

    invoke-virtual {p1}, La/j/a/l;->c()Landroid/content/Context;

    move-result-object v0

    iget-object v1, p0, La/j/a/y;->i:Landroid/os/Bundle;

    if-eqz v1, :cond_0

    invoke-virtual {v0}, Landroid/content/Context;->getClassLoader()Ljava/lang/ClassLoader;

    move-result-object v2

    invoke-virtual {v1, v2}, Landroid/os/Bundle;->setClassLoader(Ljava/lang/ClassLoader;)V

    :cond_0
    if-eqz p2, :cond_1

    iget-object v1, p0, La/j/a/y;->a:Ljava/lang/String;

    iget-object v2, p0, La/j/a/y;->i:Landroid/os/Bundle;

    invoke-virtual {p2, v0, v1, v2}, La/j/a/j;->a(Landroid/content/Context;Ljava/lang/String;Landroid/os/Bundle;)La/j/a/g;

    move-result-object p2

    goto :goto_0

    :cond_1
    iget-object p2, p0, La/j/a/y;->a:Ljava/lang/String;

    iget-object v1, p0, La/j/a/y;->i:Landroid/os/Bundle;

    invoke-static {v0, p2, v1}, La/j/a/g;->a(Landroid/content/Context;Ljava/lang/String;Landroid/os/Bundle;)La/j/a/g;

    move-result-object p2

    :goto_0
    iput-object p2, p0, La/j/a/y;->l:La/j/a/g;

    iget-object p2, p0, La/j/a/y;->k:Landroid/os/Bundle;

    if-eqz p2, :cond_2

    invoke-virtual {v0}, Landroid/content/Context;->getClassLoader()Ljava/lang/ClassLoader;

    move-result-object v0

    invoke-virtual {p2, v0}, Landroid/os/Bundle;->setClassLoader(Ljava/lang/ClassLoader;)V

    iget-object p2, p0, La/j/a/y;->l:La/j/a/g;

    iget-object v0, p0, La/j/a/y;->k:Landroid/os/Bundle;

    iput-object v0, p2, La/j/a/g;->d:Landroid/os/Bundle;

    :cond_2
    iget-object p2, p0, La/j/a/y;->l:La/j/a/g;

    iget v0, p0, La/j/a/y;->b:I

    invoke-virtual {p2, v0, p3}, La/j/a/g;->a(ILa/j/a/g;)V

    iget-object p2, p0, La/j/a/y;->l:La/j/a/g;

    iget-boolean p3, p0, La/j/a/y;->c:Z

    iput-boolean p3, p2, La/j/a/g;->o:Z

    const/4 p3, 0x1

    iput-boolean p3, p2, La/j/a/g;->q:Z

    iget p3, p0, La/j/a/y;->d:I

    iput p3, p2, La/j/a/g;->z:I

    iget p3, p0, La/j/a/y;->e:I

    iput p3, p2, La/j/a/g;->A:I

    iget-object p3, p0, La/j/a/y;->f:Ljava/lang/String;

    iput-object p3, p2, La/j/a/g;->B:Ljava/lang/String;

    iget-boolean p3, p0, La/j/a/y;->g:Z

    iput-boolean p3, p2, La/j/a/g;->E:Z

    iget-boolean p3, p0, La/j/a/y;->h:Z

    iput-boolean p3, p2, La/j/a/g;->D:Z

    iget-boolean p3, p0, La/j/a/y;->j:Z

    iput-boolean p3, p2, La/j/a/g;->C:Z

    iget-object p1, p1, La/j/a/l;->e:La/j/a/t;

    iput-object p1, p2, La/j/a/g;->t:La/j/a/t;

    sget-boolean p1, La/j/a/t;->a:Z

    if-eqz p1, :cond_3

    new-instance p1, Ljava/lang/StringBuilder;

    invoke-direct {p1}, Ljava/lang/StringBuilder;-><init>()V

    const-string p2, "Instantiated fragment "

    invoke-virtual {p1, p2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-object p2, p0, La/j/a/y;->l:La/j/a/g;

    invoke-virtual {p1, p2}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {p1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p1

    const-string p2, "FragmentManager"

    invoke-static {p2, p1}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_3
    iget-object p1, p0, La/j/a/y;->l:La/j/a/g;

    iput-object p4, p1, La/j/a/g;->w:La/j/a/u;

    iput-object p5, p1, La/j/a/g;->x:Landroidx/lifecycle/u;

    return-object p1
.end method

.method public describeContents()I
    .locals 1

    const/4 v0, 0x0

    return v0
.end method

.method public writeToParcel(Landroid/os/Parcel;I)V
    .locals 0

    iget-object p2, p0, La/j/a/y;->a:Ljava/lang/String;

    invoke-virtual {p1, p2}, Landroid/os/Parcel;->writeString(Ljava/lang/String;)V

    iget p2, p0, La/j/a/y;->b:I

    invoke-virtual {p1, p2}, Landroid/os/Parcel;->writeInt(I)V

    iget-boolean p2, p0, La/j/a/y;->c:Z

    invoke-virtual {p1, p2}, Landroid/os/Parcel;->writeInt(I)V

    iget p2, p0, La/j/a/y;->d:I

    invoke-virtual {p1, p2}, Landroid/os/Parcel;->writeInt(I)V

    iget p2, p0, La/j/a/y;->e:I

    invoke-virtual {p1, p2}, Landroid/os/Parcel;->writeInt(I)V

    iget-object p2, p0, La/j/a/y;->f:Ljava/lang/String;

    invoke-virtual {p1, p2}, Landroid/os/Parcel;->writeString(Ljava/lang/String;)V

    iget-boolean p2, p0, La/j/a/y;->g:Z

    invoke-virtual {p1, p2}, Landroid/os/Parcel;->writeInt(I)V

    iget-boolean p2, p0, La/j/a/y;->h:Z

    invoke-virtual {p1, p2}, Landroid/os/Parcel;->writeInt(I)V

    iget-object p2, p0, La/j/a/y;->i:Landroid/os/Bundle;

    invoke-virtual {p1, p2}, Landroid/os/Parcel;->writeBundle(Landroid/os/Bundle;)V

    iget-boolean p2, p0, La/j/a/y;->j:Z

    invoke-virtual {p1, p2}, Landroid/os/Parcel;->writeInt(I)V

    iget-object p2, p0, La/j/a/y;->k:Landroid/os/Bundle;

    invoke-virtual {p1, p2}, Landroid/os/Parcel;->writeBundle(Landroid/os/Bundle;)V

    return-void
.end method
