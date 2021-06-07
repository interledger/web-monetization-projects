.class public abstract Landroidx/recyclerview/widget/D$w;
.super Ljava/lang/Object;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/recyclerview/widget/D;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x409
    name = "w"
.end annotation


# static fields
.field private static final a:Ljava/util/List;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/List<",
            "Ljava/lang/Object;",
            ">;"
        }
    .end annotation
.end field


# instance fields
.field public final b:Landroid/view/View;

.field c:Ljava/lang/ref/WeakReference;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/lang/ref/WeakReference<",
            "Landroidx/recyclerview/widget/D;",
            ">;"
        }
    .end annotation
.end field

.field d:I

.field e:I

.field f:J

.field g:I

.field h:I

.field i:Landroidx/recyclerview/widget/D$w;

.field j:Landroidx/recyclerview/widget/D$w;

.field k:I

.field l:Ljava/util/List;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/List<",
            "Ljava/lang/Object;",
            ">;"
        }
    .end annotation
.end field

.field m:Ljava/util/List;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/List<",
            "Ljava/lang/Object;",
            ">;"
        }
    .end annotation
.end field

.field private n:I

.field o:Landroidx/recyclerview/widget/D$o;

.field p:Z

.field private q:I

.field r:I

.field s:Landroidx/recyclerview/widget/D;


# direct methods
.method static constructor <clinit>()V
    .locals 1

    invoke-static {}, Ljava/util/Collections;->emptyList()Ljava/util/List;

    move-result-object v0

    sput-object v0, Landroidx/recyclerview/widget/D$w;->a:Ljava/util/List;

    return-void
.end method

.method private A()V
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$w;->l:Ljava/util/List;

    if-nez v0, :cond_0

    new-instance v0, Ljava/util/ArrayList;

    invoke-direct {v0}, Ljava/util/ArrayList;-><init>()V

    iput-object v0, p0, Landroidx/recyclerview/widget/D$w;->l:Ljava/util/List;

    iget-object v0, p0, Landroidx/recyclerview/widget/D$w;->l:Ljava/util/List;

    invoke-static {v0}, Ljava/util/Collections;->unmodifiableList(Ljava/util/List;)Ljava/util/List;

    move-result-object v0

    iput-object v0, p0, Landroidx/recyclerview/widget/D$w;->m:Ljava/util/List;

    :cond_0
    return-void
.end method


# virtual methods
.method a()V
    .locals 1

    const/4 v0, -0x1

    iput v0, p0, Landroidx/recyclerview/widget/D$w;->e:I

    iput v0, p0, Landroidx/recyclerview/widget/D$w;->h:I

    return-void
.end method

.method a(I)V
    .locals 1

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->k:I

    or-int/2addr p1, v0

    iput p1, p0, Landroidx/recyclerview/widget/D$w;->k:I

    return-void
.end method

.method a(II)V
    .locals 2

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->k:I

    not-int v1, p2

    and-int/2addr v0, v1

    and-int/2addr p1, p2

    or-int/2addr p1, v0

    iput p1, p0, Landroidx/recyclerview/widget/D$w;->k:I

    return-void
.end method

.method a(IIZ)V
    .locals 1

    const/16 v0, 0x8

    invoke-virtual {p0, v0}, Landroidx/recyclerview/widget/D$w;->a(I)V

    invoke-virtual {p0, p2, p3}, Landroidx/recyclerview/widget/D$w;->a(IZ)V

    iput p1, p0, Landroidx/recyclerview/widget/D$w;->d:I

    return-void
.end method

.method a(IZ)V
    .locals 2

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->e:I

    const/4 v1, -0x1

    if-ne v0, v1, :cond_0

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->d:I

    iput v0, p0, Landroidx/recyclerview/widget/D$w;->e:I

    :cond_0
    iget v0, p0, Landroidx/recyclerview/widget/D$w;->h:I

    if-ne v0, v1, :cond_1

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->d:I

    iput v0, p0, Landroidx/recyclerview/widget/D$w;->h:I

    :cond_1
    if-eqz p2, :cond_2

    iget p2, p0, Landroidx/recyclerview/widget/D$w;->h:I

    add-int/2addr p2, p1

    iput p2, p0, Landroidx/recyclerview/widget/D$w;->h:I

    :cond_2
    iget p2, p0, Landroidx/recyclerview/widget/D$w;->d:I

    add-int/2addr p2, p1

    iput p2, p0, Landroidx/recyclerview/widget/D$w;->d:I

    iget-object p1, p0, Landroidx/recyclerview/widget/D$w;->b:Landroid/view/View;

    invoke-virtual {p1}, Landroid/view/View;->getLayoutParams()Landroid/view/ViewGroup$LayoutParams;

    move-result-object p1

    if-eqz p1, :cond_3

    iget-object p1, p0, Landroidx/recyclerview/widget/D$w;->b:Landroid/view/View;

    invoke-virtual {p1}, Landroid/view/View;->getLayoutParams()Landroid/view/ViewGroup$LayoutParams;

    move-result-object p1

    check-cast p1, Landroidx/recyclerview/widget/D$i;

    const/4 p2, 0x1

    iput-boolean p2, p1, Landroidx/recyclerview/widget/D$i;->c:Z

    :cond_3
    return-void
.end method

.method a(Landroidx/recyclerview/widget/D$o;Z)V
    .locals 0

    iput-object p1, p0, Landroidx/recyclerview/widget/D$w;->o:Landroidx/recyclerview/widget/D$o;

    iput-boolean p2, p0, Landroidx/recyclerview/widget/D$w;->p:Z

    return-void
.end method

.method a(Landroidx/recyclerview/widget/D;)V
    .locals 2

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->r:I

    const/4 v1, -0x1

    if-eq v0, v1, :cond_0

    goto :goto_0

    :cond_0
    iget-object v0, p0, Landroidx/recyclerview/widget/D$w;->b:Landroid/view/View;

    invoke-static {v0}, La/g/i/s;->h(Landroid/view/View;)I

    move-result v0

    :goto_0
    iput v0, p0, Landroidx/recyclerview/widget/D$w;->q:I

    const/4 v0, 0x4

    invoke-virtual {p1, p0, v0}, Landroidx/recyclerview/widget/D;->a(Landroidx/recyclerview/widget/D$w;I)Z

    return-void
.end method

.method a(Ljava/lang/Object;)V
    .locals 2

    const/16 v0, 0x400

    if-nez p1, :cond_0

    invoke-virtual {p0, v0}, Landroidx/recyclerview/widget/D$w;->a(I)V

    goto :goto_0

    :cond_0
    iget v1, p0, Landroidx/recyclerview/widget/D$w;->k:I

    and-int/2addr v0, v1

    if-nez v0, :cond_1

    invoke-direct {p0}, Landroidx/recyclerview/widget/D$w;->A()V

    iget-object v0, p0, Landroidx/recyclerview/widget/D$w;->l:Ljava/util/List;

    invoke-interface {v0, p1}, Ljava/util/List;->add(Ljava/lang/Object;)Z

    :cond_1
    :goto_0
    return-void
.end method

.method public final a(Z)V
    .locals 2

    const/4 v0, 0x1

    if-eqz p1, :cond_0

    iget v1, p0, Landroidx/recyclerview/widget/D$w;->n:I

    sub-int/2addr v1, v0

    goto :goto_0

    :cond_0
    iget v1, p0, Landroidx/recyclerview/widget/D$w;->n:I

    add-int/2addr v1, v0

    :goto_0
    iput v1, p0, Landroidx/recyclerview/widget/D$w;->n:I

    iget v1, p0, Landroidx/recyclerview/widget/D$w;->n:I

    if-gez v1, :cond_1

    const/4 p1, 0x0

    iput p1, p0, Landroidx/recyclerview/widget/D$w;->n:I

    new-instance p1, Ljava/lang/StringBuilder;

    invoke-direct {p1}, Ljava/lang/StringBuilder;-><init>()V

    const-string v0, "isRecyclable decremented below 0: unmatched pair of setIsRecyable() calls for "

    invoke-virtual {p1, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {p1, p0}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {p1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p1

    const-string v0, "View"

    invoke-static {v0, p1}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    goto :goto_2

    :cond_1
    if-nez p1, :cond_2

    if-ne v1, v0, :cond_2

    iget p1, p0, Landroidx/recyclerview/widget/D$w;->k:I

    or-int/lit8 p1, p1, 0x10

    :goto_1
    iput p1, p0, Landroidx/recyclerview/widget/D$w;->k:I

    goto :goto_2

    :cond_2
    if-eqz p1, :cond_3

    iget p1, p0, Landroidx/recyclerview/widget/D$w;->n:I

    if-nez p1, :cond_3

    iget p1, p0, Landroidx/recyclerview/widget/D$w;->k:I

    and-int/lit8 p1, p1, -0x11

    goto :goto_1

    :cond_3
    :goto_2
    return-void
.end method

.method b()V
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$w;->l:Ljava/util/List;

    if-eqz v0, :cond_0

    invoke-interface {v0}, Ljava/util/List;->clear()V

    :cond_0
    iget v0, p0, Landroidx/recyclerview/widget/D$w;->k:I

    and-int/lit16 v0, v0, -0x401

    iput v0, p0, Landroidx/recyclerview/widget/D$w;->k:I

    return-void
.end method

.method b(Landroidx/recyclerview/widget/D;)V
    .locals 1

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->q:I

    invoke-virtual {p1, p0, v0}, Landroidx/recyclerview/widget/D;->a(Landroidx/recyclerview/widget/D$w;I)Z

    const/4 p1, 0x0

    iput p1, p0, Landroidx/recyclerview/widget/D$w;->q:I

    return-void
.end method

.method b(I)Z
    .locals 1

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->k:I

    and-int/2addr p1, v0

    if-eqz p1, :cond_0

    const/4 p1, 0x1

    goto :goto_0

    :cond_0
    const/4 p1, 0x0

    :goto_0
    return p1
.end method

.method c()V
    .locals 1

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->k:I

    and-int/lit8 v0, v0, -0x21

    iput v0, p0, Landroidx/recyclerview/widget/D$w;->k:I

    return-void
.end method

.method d()V
    .locals 1

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->k:I

    and-int/lit16 v0, v0, -0x101

    iput v0, p0, Landroidx/recyclerview/widget/D$w;->k:I

    return-void
.end method

.method e()Z
    .locals 1

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->k:I

    and-int/lit8 v0, v0, 0x10

    if-nez v0, :cond_0

    iget-object v0, p0, Landroidx/recyclerview/widget/D$w;->b:Landroid/view/View;

    invoke-static {v0}, La/g/i/s;->u(Landroid/view/View;)Z

    move-result v0

    if-eqz v0, :cond_0

    const/4 v0, 0x1

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return v0
.end method

.method public final f()I
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$w;->s:Landroidx/recyclerview/widget/D;

    if-nez v0, :cond_0

    const/4 v0, -0x1

    return v0

    :cond_0
    invoke-virtual {v0, p0}, Landroidx/recyclerview/widget/D;->c(Landroidx/recyclerview/widget/D$w;)I

    move-result v0

    return v0
.end method

.method public final g()J
    .locals 2

    iget-wide v0, p0, Landroidx/recyclerview/widget/D$w;->f:J

    return-wide v0
.end method

.method public final h()I
    .locals 1

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->g:I

    return v0
.end method

.method public final i()I
    .locals 2

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->h:I

    const/4 v1, -0x1

    if-ne v0, v1, :cond_0

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->d:I

    :cond_0
    return v0
.end method

.method public final j()I
    .locals 1

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->e:I

    return v0
.end method

.method k()Ljava/util/List;
    .locals 1
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "()",
            "Ljava/util/List<",
            "Ljava/lang/Object;",
            ">;"
        }
    .end annotation

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->k:I

    and-int/lit16 v0, v0, 0x400

    if-nez v0, :cond_2

    iget-object v0, p0, Landroidx/recyclerview/widget/D$w;->l:Ljava/util/List;

    if-eqz v0, :cond_1

    invoke-interface {v0}, Ljava/util/List;->size()I

    move-result v0

    if-nez v0, :cond_0

    goto :goto_0

    :cond_0
    iget-object v0, p0, Landroidx/recyclerview/widget/D$w;->m:Ljava/util/List;

    return-object v0

    :cond_1
    :goto_0
    sget-object v0, Landroidx/recyclerview/widget/D$w;->a:Ljava/util/List;

    return-object v0

    :cond_2
    sget-object v0, Landroidx/recyclerview/widget/D$w;->a:Ljava/util/List;

    return-object v0
.end method

.method l()Z
    .locals 1

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->k:I

    and-int/lit16 v0, v0, 0x200

    if-nez v0, :cond_1

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$w;->n()Z

    move-result v0

    if-eqz v0, :cond_0

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    goto :goto_1

    :cond_1
    :goto_0
    const/4 v0, 0x1

    :goto_1
    return v0
.end method

.method m()Z
    .locals 2

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->k:I

    const/4 v1, 0x1

    and-int/2addr v0, v1

    if-eqz v0, :cond_0

    goto :goto_0

    :cond_0
    const/4 v1, 0x0

    :goto_0
    return v1
.end method

.method n()Z
    .locals 1

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->k:I

    and-int/lit8 v0, v0, 0x4

    if-eqz v0, :cond_0

    const/4 v0, 0x1

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return v0
.end method

.method public final o()Z
    .locals 1

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->k:I

    and-int/lit8 v0, v0, 0x10

    if-nez v0, :cond_0

    iget-object v0, p0, Landroidx/recyclerview/widget/D$w;->b:Landroid/view/View;

    invoke-static {v0}, La/g/i/s;->u(Landroid/view/View;)Z

    move-result v0

    if-nez v0, :cond_0

    const/4 v0, 0x1

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return v0
.end method

.method p()Z
    .locals 1

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->k:I

    and-int/lit8 v0, v0, 0x8

    if-eqz v0, :cond_0

    const/4 v0, 0x1

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return v0
.end method

.method q()Z
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$w;->o:Landroidx/recyclerview/widget/D$o;

    if-eqz v0, :cond_0

    const/4 v0, 0x1

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return v0
.end method

.method r()Z
    .locals 1

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->k:I

    and-int/lit16 v0, v0, 0x100

    if-eqz v0, :cond_0

    const/4 v0, 0x1

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return v0
.end method

.method s()Z
    .locals 1

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->k:I

    and-int/lit8 v0, v0, 0x2

    if-eqz v0, :cond_0

    const/4 v0, 0x1

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return v0
.end method

.method t()Z
    .locals 1

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->k:I

    and-int/lit8 v0, v0, 0x2

    if-eqz v0, :cond_0

    const/4 v0, 0x1

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return v0
.end method

.method public toString()Ljava/lang/String;
    .locals 4

    new-instance v0, Ljava/lang/StringBuilder;

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    const-string v2, "ViewHolder{"

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {p0}, Ljava/lang/Object;->hashCode()I

    move-result v2

    invoke-static {v2}, Ljava/lang/Integer;->toHexString(I)Ljava/lang/String;

    move-result-object v2

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v2, " position="

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget v2, p0, Landroidx/recyclerview/widget/D$w;->d:I

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    const-string v2, " id="

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-wide v2, p0, Landroidx/recyclerview/widget/D$w;->f:J

    invoke-virtual {v1, v2, v3}, Ljava/lang/StringBuilder;->append(J)Ljava/lang/StringBuilder;

    const-string v2, ", oldPos="

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget v2, p0, Landroidx/recyclerview/widget/D$w;->e:I

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    const-string v2, ", pLpos:"

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget v2, p0, Landroidx/recyclerview/widget/D$w;->h:I

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v1

    invoke-direct {v0, v1}, Ljava/lang/StringBuilder;-><init>(Ljava/lang/String;)V

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$w;->q()Z

    move-result v1

    if-eqz v1, :cond_1

    const-string v1, " scrap "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-boolean v1, p0, Landroidx/recyclerview/widget/D$w;->p:Z

    if-eqz v1, :cond_0

    const-string v1, "[changeScrap]"

    goto :goto_0

    :cond_0
    const-string v1, "[attachedScrap]"

    :goto_0
    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    :cond_1
    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$w;->n()Z

    move-result v1

    if-eqz v1, :cond_2

    const-string v1, " invalid"

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    :cond_2
    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$w;->m()Z

    move-result v1

    if-nez v1, :cond_3

    const-string v1, " unbound"

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    :cond_3
    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$w;->t()Z

    move-result v1

    if-eqz v1, :cond_4

    const-string v1, " update"

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    :cond_4
    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$w;->p()Z

    move-result v1

    if-eqz v1, :cond_5

    const-string v1, " removed"

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    :cond_5
    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$w;->x()Z

    move-result v1

    if-eqz v1, :cond_6

    const-string v1, " ignored"

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    :cond_6
    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$w;->r()Z

    move-result v1

    if-eqz v1, :cond_7

    const-string v1, " tmpDetached"

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    :cond_7
    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$w;->o()Z

    move-result v1

    if-nez v1, :cond_8

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    const-string v2, " not recyclable("

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget v2, p0, Landroidx/recyclerview/widget/D$w;->n:I

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    const-string v2, ")"

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v1

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    :cond_8
    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$w;->l()Z

    move-result v1

    if-eqz v1, :cond_9

    const-string v1, " undefined adapter position"

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    :cond_9
    iget-object v1, p0, Landroidx/recyclerview/widget/D$w;->b:Landroid/view/View;

    invoke-virtual {v1}, Landroid/view/View;->getParent()Landroid/view/ViewParent;

    move-result-object v1

    if-nez v1, :cond_a

    const-string v1, " no parent"

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    :cond_a
    const-string v1, "}"

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    return-object v0
.end method

.method u()V
    .locals 4

    const/4 v0, 0x0

    iput v0, p0, Landroidx/recyclerview/widget/D$w;->k:I

    const/4 v1, -0x1

    iput v1, p0, Landroidx/recyclerview/widget/D$w;->d:I

    iput v1, p0, Landroidx/recyclerview/widget/D$w;->e:I

    const-wide/16 v2, -0x1

    iput-wide v2, p0, Landroidx/recyclerview/widget/D$w;->f:J

    iput v1, p0, Landroidx/recyclerview/widget/D$w;->h:I

    iput v0, p0, Landroidx/recyclerview/widget/D$w;->n:I

    const/4 v2, 0x0

    iput-object v2, p0, Landroidx/recyclerview/widget/D$w;->i:Landroidx/recyclerview/widget/D$w;

    iput-object v2, p0, Landroidx/recyclerview/widget/D$w;->j:Landroidx/recyclerview/widget/D$w;

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$w;->b()V

    iput v0, p0, Landroidx/recyclerview/widget/D$w;->q:I

    iput v1, p0, Landroidx/recyclerview/widget/D$w;->r:I

    invoke-static {p0}, Landroidx/recyclerview/widget/D;->b(Landroidx/recyclerview/widget/D$w;)V

    return-void
.end method

.method v()V
    .locals 2

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->e:I

    const/4 v1, -0x1

    if-ne v0, v1, :cond_0

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->d:I

    iput v0, p0, Landroidx/recyclerview/widget/D$w;->e:I

    :cond_0
    return-void
.end method

.method w()Z
    .locals 1

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->k:I

    and-int/lit8 v0, v0, 0x10

    if-eqz v0, :cond_0

    const/4 v0, 0x1

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return v0
.end method

.method x()Z
    .locals 1

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->k:I

    and-int/lit16 v0, v0, 0x80

    if-eqz v0, :cond_0

    const/4 v0, 0x1

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return v0
.end method

.method y()V
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$w;->o:Landroidx/recyclerview/widget/D$o;

    invoke-virtual {v0, p0}, Landroidx/recyclerview/widget/D$o;->c(Landroidx/recyclerview/widget/D$w;)V

    return-void
.end method

.method z()Z
    .locals 1

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->k:I

    and-int/lit8 v0, v0, 0x20

    if-eqz v0, :cond_0

    const/4 v0, 0x1

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return v0
.end method
