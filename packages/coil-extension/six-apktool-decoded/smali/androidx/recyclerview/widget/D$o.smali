.class public final Landroidx/recyclerview/widget/D$o;
.super Ljava/lang/Object;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/recyclerview/widget/D;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x11
    name = "o"
.end annotation


# instance fields
.field final a:Ljava/util/ArrayList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/ArrayList<",
            "Landroidx/recyclerview/widget/D$w;",
            ">;"
        }
    .end annotation
.end field

.field b:Ljava/util/ArrayList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/ArrayList<",
            "Landroidx/recyclerview/widget/D$w;",
            ">;"
        }
    .end annotation
.end field

.field final c:Ljava/util/ArrayList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/ArrayList<",
            "Landroidx/recyclerview/widget/D$w;",
            ">;"
        }
    .end annotation
.end field

.field private final d:Ljava/util/List;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/List<",
            "Landroidx/recyclerview/widget/D$w;",
            ">;"
        }
    .end annotation
.end field

.field private e:I

.field f:I

.field g:Landroidx/recyclerview/widget/D$n;

.field private h:Landroidx/recyclerview/widget/D$u;

.field final synthetic i:Landroidx/recyclerview/widget/D;


# direct methods
.method public constructor <init>(Landroidx/recyclerview/widget/D;)V
    .locals 0

    iput-object p1, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    new-instance p1, Ljava/util/ArrayList;

    invoke-direct {p1}, Ljava/util/ArrayList;-><init>()V

    iput-object p1, p0, Landroidx/recyclerview/widget/D$o;->a:Ljava/util/ArrayList;

    const/4 p1, 0x0

    iput-object p1, p0, Landroidx/recyclerview/widget/D$o;->b:Ljava/util/ArrayList;

    new-instance p1, Ljava/util/ArrayList;

    invoke-direct {p1}, Ljava/util/ArrayList;-><init>()V

    iput-object p1, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    iget-object p1, p0, Landroidx/recyclerview/widget/D$o;->a:Ljava/util/ArrayList;

    invoke-static {p1}, Ljava/util/Collections;->unmodifiableList(Ljava/util/List;)Ljava/util/List;

    move-result-object p1

    iput-object p1, p0, Landroidx/recyclerview/widget/D$o;->d:Ljava/util/List;

    const/4 p1, 0x2

    iput p1, p0, Landroidx/recyclerview/widget/D$o;->e:I

    iput p1, p0, Landroidx/recyclerview/widget/D$o;->f:I

    return-void
.end method

.method private a(Landroid/view/ViewGroup;Z)V
    .locals 4

    invoke-virtual {p1}, Landroid/view/ViewGroup;->getChildCount()I

    move-result v0

    const/4 v1, 0x1

    sub-int/2addr v0, v1

    :goto_0
    if-ltz v0, :cond_1

    invoke-virtual {p1, v0}, Landroid/view/ViewGroup;->getChildAt(I)Landroid/view/View;

    move-result-object v2

    instance-of v3, v2, Landroid/view/ViewGroup;

    if-eqz v3, :cond_0

    check-cast v2, Landroid/view/ViewGroup;

    invoke-direct {p0, v2, v1}, Landroidx/recyclerview/widget/D$o;->a(Landroid/view/ViewGroup;Z)V

    :cond_0
    add-int/lit8 v0, v0, -0x1

    goto :goto_0

    :cond_1
    if-nez p2, :cond_2

    return-void

    :cond_2
    invoke-virtual {p1}, Landroid/view/ViewGroup;->getVisibility()I

    move-result p2

    const/4 v0, 0x4

    if-ne p2, v0, :cond_3

    const/4 p2, 0x0

    invoke-virtual {p1, p2}, Landroid/view/ViewGroup;->setVisibility(I)V

    invoke-virtual {p1, v0}, Landroid/view/ViewGroup;->setVisibility(I)V

    goto :goto_1

    :cond_3
    invoke-virtual {p1}, Landroid/view/ViewGroup;->getVisibility()I

    move-result p2

    invoke-virtual {p1, v0}, Landroid/view/ViewGroup;->setVisibility(I)V

    invoke-virtual {p1, p2}, Landroid/view/ViewGroup;->setVisibility(I)V

    :goto_1
    return-void
.end method

.method private a(Landroidx/recyclerview/widget/D$w;IIJ)Z
    .locals 9

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iput-object v0, p1, Landroidx/recyclerview/widget/D$w;->s:Landroidx/recyclerview/widget/D;

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$w;->h()I

    move-result v2

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D;->getNanoTime()J

    move-result-wide v7

    const-wide v0, 0x7fffffffffffffffL

    cmp-long v0, p4, v0

    if-eqz v0, :cond_0

    iget-object v1, p0, Landroidx/recyclerview/widget/D$o;->g:Landroidx/recyclerview/widget/D$n;

    move-wide v3, v7

    move-wide v5, p4

    invoke-virtual/range {v1 .. v6}, Landroidx/recyclerview/widget/D$n;->a(IJJ)Z

    move-result p4

    if-nez p4, :cond_0

    const/4 p1, 0x0

    return p1

    :cond_0
    iget-object p4, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object p4, p4, Landroidx/recyclerview/widget/D;->v:Landroidx/recyclerview/widget/D$a;

    invoke-virtual {p4, p1, p2}, Landroidx/recyclerview/widget/D$a;->a(Landroidx/recyclerview/widget/D$w;I)V

    iget-object p2, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    invoke-virtual {p2}, Landroidx/recyclerview/widget/D;->getNanoTime()J

    move-result-wide p4

    iget-object p2, p0, Landroidx/recyclerview/widget/D$o;->g:Landroidx/recyclerview/widget/D$n;

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$w;->h()I

    move-result v0

    sub-long/2addr p4, v7

    invoke-virtual {p2, v0, p4, p5}, Landroidx/recyclerview/widget/D$n;->a(IJ)V

    invoke-direct {p0, p1}, Landroidx/recyclerview/widget/D$o;->e(Landroidx/recyclerview/widget/D$w;)V

    iget-object p2, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object p2, p2, Landroidx/recyclerview/widget/D;->ra:Landroidx/recyclerview/widget/D$t;

    invoke-virtual {p2}, Landroidx/recyclerview/widget/D$t;->d()Z

    move-result p2

    if-eqz p2, :cond_1

    iput p3, p1, Landroidx/recyclerview/widget/D$w;->h:I

    :cond_1
    const/4 p1, 0x1

    return p1
.end method

.method private e(Landroidx/recyclerview/widget/D$w;)V
    .locals 2

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D;->m()Z

    move-result v0

    if-eqz v0, :cond_1

    iget-object v0, p1, Landroidx/recyclerview/widget/D$w;->b:Landroid/view/View;

    invoke-static {v0}, La/g/i/s;->h(Landroid/view/View;)I

    move-result v1

    if-nez v1, :cond_0

    const/4 v1, 0x1

    invoke-static {v0, v1}, La/g/i/s;->c(Landroid/view/View;I)V

    :cond_0
    invoke-static {v0}, La/g/i/s;->r(Landroid/view/View;)Z

    move-result v1

    if-nez v1, :cond_1

    const/16 v1, 0x4000

    invoke-virtual {p1, v1}, Landroidx/recyclerview/widget/D$w;->a(I)V

    iget-object p1, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object p1, p1, Landroidx/recyclerview/widget/D;->ya:Landroidx/recyclerview/widget/H;

    invoke-virtual {p1}, Landroidx/recyclerview/widget/H;->b()La/g/i/a;

    move-result-object p1

    invoke-static {v0, p1}, La/g/i/s;->a(Landroid/view/View;La/g/i/a;)V

    :cond_1
    return-void
.end method

.method private f(Landroidx/recyclerview/widget/D$w;)V
    .locals 1

    iget-object p1, p1, Landroidx/recyclerview/widget/D$w;->b:Landroid/view/View;

    instance-of v0, p1, Landroid/view/ViewGroup;

    if-eqz v0, :cond_0

    check-cast p1, Landroid/view/ViewGroup;

    const/4 v0, 0x0

    invoke-direct {p0, p1, v0}, Landroidx/recyclerview/widget/D$o;->a(Landroid/view/ViewGroup;Z)V

    :cond_0
    return-void
.end method


# virtual methods
.method public a(I)I
    .locals 3

    if-ltz p1, :cond_1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->ra:Landroidx/recyclerview/widget/D$t;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$t;->a()I

    move-result v0

    if-ge p1, v0, :cond_1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->ra:Landroidx/recyclerview/widget/D$t;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$t;->d()Z

    move-result v0

    if-nez v0, :cond_0

    return p1

    :cond_0
    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->n:Landroidx/recyclerview/widget/a;

    invoke-virtual {v0, p1}, Landroidx/recyclerview/widget/a;->b(I)I

    move-result p1

    return p1

    :cond_1
    new-instance v0, Ljava/lang/IndexOutOfBoundsException;

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    const-string v2, "invalid position "

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, p1}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    const-string p1, ". State "

    invoke-virtual {v1, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string p1, "item count is "

    invoke-virtual {v1, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-object p1, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object p1, p1, Landroidx/recyclerview/widget/D;->ra:Landroidx/recyclerview/widget/D$t;

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$t;->a()I

    move-result p1

    invoke-virtual {v1, p1}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    iget-object p1, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D;->i()Ljava/lang/String;

    move-result-object p1

    invoke-virtual {v1, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p1

    invoke-direct {v0, p1}, Ljava/lang/IndexOutOfBoundsException;-><init>(Ljava/lang/String;)V

    throw v0
.end method

.method a(IZ)Landroidx/recyclerview/widget/D$w;
    .locals 5

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->a:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    const/4 v1, 0x0

    move v2, v1

    :goto_0
    if-ge v2, v0, :cond_2

    iget-object v3, p0, Landroidx/recyclerview/widget/D$o;->a:Ljava/util/ArrayList;

    invoke-virtual {v3, v2}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v3

    check-cast v3, Landroidx/recyclerview/widget/D$w;

    invoke-virtual {v3}, Landroidx/recyclerview/widget/D$w;->z()Z

    move-result v4

    if-nez v4, :cond_1

    invoke-virtual {v3}, Landroidx/recyclerview/widget/D$w;->i()I

    move-result v4

    if-ne v4, p1, :cond_1

    invoke-virtual {v3}, Landroidx/recyclerview/widget/D$w;->n()Z

    move-result v4

    if-nez v4, :cond_1

    iget-object v4, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v4, v4, Landroidx/recyclerview/widget/D;->ra:Landroidx/recyclerview/widget/D$t;

    iget-boolean v4, v4, Landroidx/recyclerview/widget/D$t;->h:Z

    if-nez v4, :cond_0

    invoke-virtual {v3}, Landroidx/recyclerview/widget/D$w;->p()Z

    move-result v4

    if-nez v4, :cond_1

    :cond_0
    const/16 p1, 0x20

    invoke-virtual {v3, p1}, Landroidx/recyclerview/widget/D$w;->a(I)V

    return-object v3

    :cond_1
    add-int/lit8 v2, v2, 0x1

    goto :goto_0

    :cond_2
    if-nez p2, :cond_4

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->o:Landroidx/recyclerview/widget/b;

    invoke-virtual {v0, p1}, Landroidx/recyclerview/widget/b;->b(I)Landroid/view/View;

    move-result-object v0

    if-eqz v0, :cond_4

    invoke-static {v0}, Landroidx/recyclerview/widget/D;->g(Landroid/view/View;)Landroidx/recyclerview/widget/D$w;

    move-result-object p1

    iget-object p2, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object p2, p2, Landroidx/recyclerview/widget/D;->o:Landroidx/recyclerview/widget/b;

    invoke-virtual {p2, v0}, Landroidx/recyclerview/widget/b;->f(Landroid/view/View;)V

    iget-object p2, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object p2, p2, Landroidx/recyclerview/widget/D;->o:Landroidx/recyclerview/widget/b;

    invoke-virtual {p2, v0}, Landroidx/recyclerview/widget/b;->b(Landroid/view/View;)I

    move-result p2

    const/4 v1, -0x1

    if-eq p2, v1, :cond_3

    iget-object v1, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v1, v1, Landroidx/recyclerview/widget/D;->o:Landroidx/recyclerview/widget/b;

    invoke-virtual {v1, p2}, Landroidx/recyclerview/widget/b;->a(I)V

    invoke-virtual {p0, v0}, Landroidx/recyclerview/widget/D$o;->c(Landroid/view/View;)V

    const/16 p2, 0x2020

    invoke-virtual {p1, p2}, Landroidx/recyclerview/widget/D$w;->a(I)V

    return-object p1

    :cond_3
    new-instance p2, Ljava/lang/IllegalStateException;

    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "layout index should not be -1 after unhiding a view:"

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    iget-object p1, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D;->i()Ljava/lang/String;

    move-result-object p1

    invoke-virtual {v0, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p1

    invoke-direct {p2, p1}, Ljava/lang/IllegalStateException;-><init>(Ljava/lang/String;)V

    throw p2

    :cond_4
    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    :goto_1
    if-ge v1, v0, :cond_7

    iget-object v2, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {v2, v1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, Landroidx/recyclerview/widget/D$w;

    invoke-virtual {v2}, Landroidx/recyclerview/widget/D$w;->n()Z

    move-result v3

    if-nez v3, :cond_6

    invoke-virtual {v2}, Landroidx/recyclerview/widget/D$w;->i()I

    move-result v3

    if-ne v3, p1, :cond_6

    if-nez p2, :cond_5

    iget-object p1, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {p1, v1}, Ljava/util/ArrayList;->remove(I)Ljava/lang/Object;

    :cond_5
    return-object v2

    :cond_6
    add-int/lit8 v1, v1, 0x1

    goto :goto_1

    :cond_7
    const/4 p1, 0x0

    return-object p1
.end method

.method a(IZJ)Landroidx/recyclerview/widget/D$w;
    .locals 16

    move-object/from16 v6, p0

    move/from16 v3, p1

    move/from16 v0, p2

    if-ltz v3, :cond_17

    iget-object v1, v6, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v1, v1, Landroidx/recyclerview/widget/D;->ra:Landroidx/recyclerview/widget/D$t;

    invoke-virtual {v1}, Landroidx/recyclerview/widget/D$t;->a()I

    move-result v1

    if-ge v3, v1, :cond_17

    iget-object v1, v6, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v1, v1, Landroidx/recyclerview/widget/D;->ra:Landroidx/recyclerview/widget/D$t;

    invoke-virtual {v1}, Landroidx/recyclerview/widget/D$t;->d()Z

    move-result v1

    const/4 v2, 0x0

    const/4 v7, 0x1

    const/4 v8, 0x0

    if-eqz v1, :cond_0

    invoke-virtual/range {p0 .. p1}, Landroidx/recyclerview/widget/D$o;->b(I)Landroidx/recyclerview/widget/D$w;

    move-result-object v1

    if-eqz v1, :cond_1

    move v4, v7

    goto :goto_0

    :cond_0
    move-object v1, v2

    :cond_1
    move v4, v8

    :goto_0
    if-nez v1, :cond_6

    invoke-virtual/range {p0 .. p2}, Landroidx/recyclerview/widget/D$o;->a(IZ)Landroidx/recyclerview/widget/D$w;

    move-result-object v1

    if-eqz v1, :cond_6

    invoke-virtual {v6, v1}, Landroidx/recyclerview/widget/D$o;->d(Landroidx/recyclerview/widget/D$w;)Z

    move-result v5

    if-nez v5, :cond_5

    if-nez v0, :cond_4

    const/4 v5, 0x4

    invoke-virtual {v1, v5}, Landroidx/recyclerview/widget/D$w;->a(I)V

    invoke-virtual {v1}, Landroidx/recyclerview/widget/D$w;->q()Z

    move-result v5

    if-eqz v5, :cond_2

    iget-object v5, v6, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v9, v1, Landroidx/recyclerview/widget/D$w;->b:Landroid/view/View;

    invoke-virtual {v5, v9, v8}, Landroidx/recyclerview/widget/D;->removeDetachedView(Landroid/view/View;Z)V

    invoke-virtual {v1}, Landroidx/recyclerview/widget/D$w;->y()V

    goto :goto_1

    :cond_2
    invoke-virtual {v1}, Landroidx/recyclerview/widget/D$w;->z()Z

    move-result v5

    if-eqz v5, :cond_3

    invoke-virtual {v1}, Landroidx/recyclerview/widget/D$w;->c()V

    :cond_3
    :goto_1
    invoke-virtual {v6, v1}, Landroidx/recyclerview/widget/D$o;->b(Landroidx/recyclerview/widget/D$w;)V

    :cond_4
    move-object v1, v2

    goto :goto_2

    :cond_5
    move v4, v7

    :cond_6
    :goto_2
    if-nez v1, :cond_f

    iget-object v5, v6, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v5, v5, Landroidx/recyclerview/widget/D;->n:Landroidx/recyclerview/widget/a;

    invoke-virtual {v5, v3}, Landroidx/recyclerview/widget/a;->b(I)I

    move-result v5

    if-ltz v5, :cond_e

    iget-object v9, v6, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v9, v9, Landroidx/recyclerview/widget/D;->v:Landroidx/recyclerview/widget/D$a;

    invoke-virtual {v9}, Landroidx/recyclerview/widget/D$a;->a()I

    move-result v9

    if-ge v5, v9, :cond_e

    iget-object v9, v6, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v9, v9, Landroidx/recyclerview/widget/D;->v:Landroidx/recyclerview/widget/D$a;

    invoke-virtual {v9, v5}, Landroidx/recyclerview/widget/D$a;->b(I)I

    move-result v9

    iget-object v10, v6, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v10, v10, Landroidx/recyclerview/widget/D;->v:Landroidx/recyclerview/widget/D$a;

    invoke-virtual {v10}, Landroidx/recyclerview/widget/D$a;->b()Z

    move-result v10

    if-eqz v10, :cond_7

    iget-object v1, v6, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v1, v1, Landroidx/recyclerview/widget/D;->v:Landroidx/recyclerview/widget/D$a;

    invoke-virtual {v1, v5}, Landroidx/recyclerview/widget/D$a;->a(I)J

    move-result-wide v10

    invoke-virtual {v6, v10, v11, v9, v0}, Landroidx/recyclerview/widget/D$o;->a(JIZ)Landroidx/recyclerview/widget/D$w;

    move-result-object v1

    if-eqz v1, :cond_7

    iput v5, v1, Landroidx/recyclerview/widget/D$w;->d:I

    move v4, v7

    :cond_7
    if-nez v1, :cond_a

    iget-object v0, v6, Landroidx/recyclerview/widget/D$o;->h:Landroidx/recyclerview/widget/D$u;

    if-eqz v0, :cond_a

    invoke-virtual {v0, v6, v3, v9}, Landroidx/recyclerview/widget/D$u;->a(Landroidx/recyclerview/widget/D$o;II)Landroid/view/View;

    move-result-object v0

    if-eqz v0, :cond_a

    iget-object v1, v6, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    invoke-virtual {v1, v0}, Landroidx/recyclerview/widget/D;->f(Landroid/view/View;)Landroidx/recyclerview/widget/D$w;

    move-result-object v1

    if-eqz v1, :cond_9

    invoke-virtual {v1}, Landroidx/recyclerview/widget/D$w;->x()Z

    move-result v0

    if-nez v0, :cond_8

    goto :goto_3

    :cond_8
    new-instance v0, Ljava/lang/IllegalArgumentException;

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    const-string v2, "getViewForPositionAndType returned a view that is ignored. You must call stopIgnoring before returning this view."

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-object v2, v6, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    invoke-virtual {v2}, Landroidx/recyclerview/widget/D;->i()Ljava/lang/String;

    move-result-object v2

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v1

    invoke-direct {v0, v1}, Ljava/lang/IllegalArgumentException;-><init>(Ljava/lang/String;)V

    throw v0

    :cond_9
    new-instance v0, Ljava/lang/IllegalArgumentException;

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    const-string v2, "getViewForPositionAndType returned a view which does not have a ViewHolder"

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-object v2, v6, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    invoke-virtual {v2}, Landroidx/recyclerview/widget/D;->i()Ljava/lang/String;

    move-result-object v2

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v1

    invoke-direct {v0, v1}, Ljava/lang/IllegalArgumentException;-><init>(Ljava/lang/String;)V

    throw v0

    :cond_a
    :goto_3
    if-nez v1, :cond_b

    invoke-virtual/range {p0 .. p0}, Landroidx/recyclerview/widget/D$o;->d()Landroidx/recyclerview/widget/D$n;

    move-result-object v0

    invoke-virtual {v0, v9}, Landroidx/recyclerview/widget/D$n;->a(I)Landroidx/recyclerview/widget/D$w;

    move-result-object v1

    if-eqz v1, :cond_b

    invoke-virtual {v1}, Landroidx/recyclerview/widget/D$w;->u()V

    sget-boolean v0, Landroidx/recyclerview/widget/D;->c:Z

    if-eqz v0, :cond_b

    invoke-direct {v6, v1}, Landroidx/recyclerview/widget/D$o;->f(Landroidx/recyclerview/widget/D$w;)V

    :cond_b
    if-nez v1, :cond_f

    iget-object v0, v6, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D;->getNanoTime()J

    move-result-wide v0

    const-wide v10, 0x7fffffffffffffffL

    cmp-long v5, p3, v10

    if-eqz v5, :cond_c

    iget-object v10, v6, Landroidx/recyclerview/widget/D$o;->g:Landroidx/recyclerview/widget/D$n;

    move v11, v9

    move-wide v12, v0

    move-wide/from16 v14, p3

    invoke-virtual/range {v10 .. v15}, Landroidx/recyclerview/widget/D$n;->b(IJJ)Z

    move-result v5

    if-nez v5, :cond_c

    return-object v2

    :cond_c
    iget-object v2, v6, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v5, v2, Landroidx/recyclerview/widget/D;->v:Landroidx/recyclerview/widget/D$a;

    invoke-virtual {v5, v2, v9}, Landroidx/recyclerview/widget/D$a;->a(Landroid/view/ViewGroup;I)Landroidx/recyclerview/widget/D$w;

    move-result-object v2

    sget-boolean v5, Landroidx/recyclerview/widget/D;->f:Z

    if-eqz v5, :cond_d

    iget-object v5, v2, Landroidx/recyclerview/widget/D$w;->b:Landroid/view/View;

    invoke-static {v5}, Landroidx/recyclerview/widget/D;->e(Landroid/view/View;)Landroidx/recyclerview/widget/D;

    move-result-object v5

    if-eqz v5, :cond_d

    new-instance v10, Ljava/lang/ref/WeakReference;

    invoke-direct {v10, v5}, Ljava/lang/ref/WeakReference;-><init>(Ljava/lang/Object;)V

    iput-object v10, v2, Landroidx/recyclerview/widget/D$w;->c:Ljava/lang/ref/WeakReference;

    :cond_d
    iget-object v5, v6, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    invoke-virtual {v5}, Landroidx/recyclerview/widget/D;->getNanoTime()J

    move-result-wide v10

    iget-object v5, v6, Landroidx/recyclerview/widget/D$o;->g:Landroidx/recyclerview/widget/D$n;

    sub-long/2addr v10, v0

    invoke-virtual {v5, v9, v10, v11}, Landroidx/recyclerview/widget/D$n;->b(IJ)V

    move-object v10, v2

    goto :goto_4

    :cond_e
    new-instance v0, Ljava/lang/IndexOutOfBoundsException;

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    const-string v2, "Inconsistency detected. Invalid item position "

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, v3}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    const-string v2, "(offset:"

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, v5}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    const-string v2, ")."

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v2, "state:"

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-object v2, v6, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v2, v2, Landroidx/recyclerview/widget/D;->ra:Landroidx/recyclerview/widget/D$t;

    invoke-virtual {v2}, Landroidx/recyclerview/widget/D$t;->a()I

    move-result v2

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    iget-object v2, v6, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    invoke-virtual {v2}, Landroidx/recyclerview/widget/D;->i()Ljava/lang/String;

    move-result-object v2

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v1

    invoke-direct {v0, v1}, Ljava/lang/IndexOutOfBoundsException;-><init>(Ljava/lang/String;)V

    throw v0

    :cond_f
    move-object v10, v1

    :goto_4
    move v9, v4

    if-eqz v9, :cond_10

    iget-object v0, v6, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->ra:Landroidx/recyclerview/widget/D$t;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$t;->d()Z

    move-result v0

    if-nez v0, :cond_10

    const/16 v0, 0x2000

    invoke-virtual {v10, v0}, Landroidx/recyclerview/widget/D$w;->b(I)Z

    move-result v1

    if-eqz v1, :cond_10

    invoke-virtual {v10, v8, v0}, Landroidx/recyclerview/widget/D$w;->a(II)V

    iget-object v0, v6, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->ra:Landroidx/recyclerview/widget/D$t;

    iget-boolean v0, v0, Landroidx/recyclerview/widget/D$t;->k:Z

    if-eqz v0, :cond_10

    invoke-static {v10}, Landroidx/recyclerview/widget/D$e;->a(Landroidx/recyclerview/widget/D$w;)I

    move-result v0

    or-int/lit16 v0, v0, 0x1000

    iget-object v1, v6, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v2, v1, Landroidx/recyclerview/widget/D;->W:Landroidx/recyclerview/widget/D$e;

    iget-object v1, v1, Landroidx/recyclerview/widget/D;->ra:Landroidx/recyclerview/widget/D$t;

    invoke-virtual {v10}, Landroidx/recyclerview/widget/D$w;->k()Ljava/util/List;

    move-result-object v4

    invoke-virtual {v2, v1, v10, v0, v4}, Landroidx/recyclerview/widget/D$e;->a(Landroidx/recyclerview/widget/D$t;Landroidx/recyclerview/widget/D$w;ILjava/util/List;)Landroidx/recyclerview/widget/D$e$c;

    move-result-object v0

    iget-object v1, v6, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    invoke-virtual {v1, v10, v0}, Landroidx/recyclerview/widget/D;->a(Landroidx/recyclerview/widget/D$w;Landroidx/recyclerview/widget/D$e$c;)V

    :cond_10
    iget-object v0, v6, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->ra:Landroidx/recyclerview/widget/D$t;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$t;->d()Z

    move-result v0

    if-eqz v0, :cond_11

    invoke-virtual {v10}, Landroidx/recyclerview/widget/D$w;->m()Z

    move-result v0

    if-eqz v0, :cond_11

    iput v3, v10, Landroidx/recyclerview/widget/D$w;->h:I

    goto :goto_5

    :cond_11
    invoke-virtual {v10}, Landroidx/recyclerview/widget/D$w;->m()Z

    move-result v0

    if-eqz v0, :cond_13

    invoke-virtual {v10}, Landroidx/recyclerview/widget/D$w;->t()Z

    move-result v0

    if-nez v0, :cond_13

    invoke-virtual {v10}, Landroidx/recyclerview/widget/D$w;->n()Z

    move-result v0

    if-eqz v0, :cond_12

    goto :goto_6

    :cond_12
    :goto_5
    move v0, v8

    goto :goto_7

    :cond_13
    :goto_6
    iget-object v0, v6, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->n:Landroidx/recyclerview/widget/a;

    invoke-virtual {v0, v3}, Landroidx/recyclerview/widget/a;->b(I)I

    move-result v2

    move-object/from16 v0, p0

    move-object v1, v10

    move/from16 v3, p1

    move-wide/from16 v4, p3

    invoke-direct/range {v0 .. v5}, Landroidx/recyclerview/widget/D$o;->a(Landroidx/recyclerview/widget/D$w;IIJ)Z

    move-result v0

    :goto_7
    iget-object v1, v10, Landroidx/recyclerview/widget/D$w;->b:Landroid/view/View;

    invoke-virtual {v1}, Landroid/view/View;->getLayoutParams()Landroid/view/ViewGroup$LayoutParams;

    move-result-object v1

    if-nez v1, :cond_14

    iget-object v1, v6, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    invoke-virtual {v1}, Landroidx/recyclerview/widget/D;->generateDefaultLayoutParams()Landroid/view/ViewGroup$LayoutParams;

    move-result-object v1

    :goto_8
    check-cast v1, Landroidx/recyclerview/widget/D$i;

    iget-object v2, v10, Landroidx/recyclerview/widget/D$w;->b:Landroid/view/View;

    invoke-virtual {v2, v1}, Landroid/view/View;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    goto :goto_9

    :cond_14
    iget-object v2, v6, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    invoke-virtual {v2, v1}, Landroidx/recyclerview/widget/D;->checkLayoutParams(Landroid/view/ViewGroup$LayoutParams;)Z

    move-result v2

    if-nez v2, :cond_15

    iget-object v2, v6, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    invoke-virtual {v2, v1}, Landroidx/recyclerview/widget/D;->generateLayoutParams(Landroid/view/ViewGroup$LayoutParams;)Landroid/view/ViewGroup$LayoutParams;

    move-result-object v1

    goto :goto_8

    :cond_15
    check-cast v1, Landroidx/recyclerview/widget/D$i;

    :goto_9
    iput-object v10, v1, Landroidx/recyclerview/widget/D$i;->a:Landroidx/recyclerview/widget/D$w;

    if-eqz v9, :cond_16

    if-eqz v0, :cond_16

    goto :goto_a

    :cond_16
    move v7, v8

    :goto_a
    iput-boolean v7, v1, Landroidx/recyclerview/widget/D$i;->d:Z

    return-object v10

    :cond_17
    new-instance v0, Ljava/lang/IndexOutOfBoundsException;

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    const-string v2, "Invalid item position "

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, v3}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    const-string v2, "("

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, v3}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    const-string v2, "). Item count:"

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-object v2, v6, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v2, v2, Landroidx/recyclerview/widget/D;->ra:Landroidx/recyclerview/widget/D$t;

    invoke-virtual {v2}, Landroidx/recyclerview/widget/D$t;->a()I

    move-result v2

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    iget-object v2, v6, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    invoke-virtual {v2}, Landroidx/recyclerview/widget/D;->i()Ljava/lang/String;

    move-result-object v2

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v1

    invoke-direct {v0, v1}, Ljava/lang/IndexOutOfBoundsException;-><init>(Ljava/lang/String;)V

    throw v0
.end method

.method a(JIZ)Landroidx/recyclerview/widget/D$w;
    .locals 5

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->a:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    add-int/lit8 v0, v0, -0x1

    :goto_0
    if-ltz v0, :cond_3

    iget-object v1, p0, Landroidx/recyclerview/widget/D$o;->a:Ljava/util/ArrayList;

    invoke-virtual {v1, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, Landroidx/recyclerview/widget/D$w;

    invoke-virtual {v1}, Landroidx/recyclerview/widget/D$w;->g()J

    move-result-wide v2

    cmp-long v2, v2, p1

    if-nez v2, :cond_2

    invoke-virtual {v1}, Landroidx/recyclerview/widget/D$w;->z()Z

    move-result v2

    if-nez v2, :cond_2

    invoke-virtual {v1}, Landroidx/recyclerview/widget/D$w;->h()I

    move-result v2

    if-ne p3, v2, :cond_1

    const/16 p1, 0x20

    invoke-virtual {v1, p1}, Landroidx/recyclerview/widget/D$w;->a(I)V

    invoke-virtual {v1}, Landroidx/recyclerview/widget/D$w;->p()Z

    move-result p1

    if-eqz p1, :cond_0

    iget-object p1, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object p1, p1, Landroidx/recyclerview/widget/D;->ra:Landroidx/recyclerview/widget/D$t;

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$t;->d()Z

    move-result p1

    if-nez p1, :cond_0

    const/4 p1, 0x2

    const/16 p2, 0xe

    invoke-virtual {v1, p1, p2}, Landroidx/recyclerview/widget/D$w;->a(II)V

    :cond_0
    return-object v1

    :cond_1
    if-nez p4, :cond_2

    iget-object v2, p0, Landroidx/recyclerview/widget/D$o;->a:Ljava/util/ArrayList;

    invoke-virtual {v2, v0}, Ljava/util/ArrayList;->remove(I)Ljava/lang/Object;

    iget-object v2, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v3, v1, Landroidx/recyclerview/widget/D$w;->b:Landroid/view/View;

    const/4 v4, 0x0

    invoke-virtual {v2, v3, v4}, Landroidx/recyclerview/widget/D;->removeDetachedView(Landroid/view/View;Z)V

    iget-object v1, v1, Landroidx/recyclerview/widget/D$w;->b:Landroid/view/View;

    invoke-virtual {p0, v1}, Landroidx/recyclerview/widget/D$o;->a(Landroid/view/View;)V

    :cond_2
    add-int/lit8 v0, v0, -0x1

    goto :goto_0

    :cond_3
    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    add-int/lit8 v0, v0, -0x1

    :goto_1
    const/4 v1, 0x0

    if-ltz v0, :cond_7

    iget-object v2, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {v2, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, Landroidx/recyclerview/widget/D$w;

    invoke-virtual {v2}, Landroidx/recyclerview/widget/D$w;->g()J

    move-result-wide v3

    cmp-long v3, v3, p1

    if-nez v3, :cond_6

    invoke-virtual {v2}, Landroidx/recyclerview/widget/D$w;->h()I

    move-result v3

    if-ne p3, v3, :cond_5

    if-nez p4, :cond_4

    iget-object p1, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {p1, v0}, Ljava/util/ArrayList;->remove(I)Ljava/lang/Object;

    :cond_4
    return-object v2

    :cond_5
    if-nez p4, :cond_6

    invoke-virtual {p0, v0}, Landroidx/recyclerview/widget/D$o;->e(I)V

    return-object v1

    :cond_6
    add-int/lit8 v0, v0, -0x1

    goto :goto_1

    :cond_7
    return-object v1
.end method

.method public a()V
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->a:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->clear()V

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$o;->i()V

    return-void
.end method

.method a(II)V
    .locals 4

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    const/4 v1, 0x0

    :goto_0
    if-ge v1, v0, :cond_1

    iget-object v2, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {v2, v1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, Landroidx/recyclerview/widget/D$w;

    if-eqz v2, :cond_0

    iget v3, v2, Landroidx/recyclerview/widget/D$w;->d:I

    if-lt v3, p1, :cond_0

    const/4 v3, 0x1

    invoke-virtual {v2, p2, v3}, Landroidx/recyclerview/widget/D$w;->a(IZ)V

    :cond_0
    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_1
    return-void
.end method

.method a(IIZ)V
    .locals 4

    add-int v0, p1, p2

    iget-object v1, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {v1}, Ljava/util/ArrayList;->size()I

    move-result v1

    add-int/lit8 v1, v1, -0x1

    :goto_0
    if-ltz v1, :cond_2

    iget-object v2, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {v2, v1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, Landroidx/recyclerview/widget/D$w;

    if-eqz v2, :cond_1

    iget v3, v2, Landroidx/recyclerview/widget/D$w;->d:I

    if-lt v3, v0, :cond_0

    neg-int v3, p2

    invoke-virtual {v2, v3, p3}, Landroidx/recyclerview/widget/D$w;->a(IZ)V

    goto :goto_1

    :cond_0
    if-lt v3, p1, :cond_1

    const/16 v3, 0x8

    invoke-virtual {v2, v3}, Landroidx/recyclerview/widget/D$w;->a(I)V

    invoke-virtual {p0, v1}, Landroidx/recyclerview/widget/D$o;->e(I)V

    :cond_1
    :goto_1
    add-int/lit8 v1, v1, -0x1

    goto :goto_0

    :cond_2
    return-void
.end method

.method a(Landroid/view/View;)V
    .locals 1

    invoke-static {p1}, Landroidx/recyclerview/widget/D;->g(Landroid/view/View;)Landroidx/recyclerview/widget/D$w;

    move-result-object p1

    const/4 v0, 0x0

    iput-object v0, p1, Landroidx/recyclerview/widget/D$w;->o:Landroidx/recyclerview/widget/D$o;

    const/4 v0, 0x0

    iput-boolean v0, p1, Landroidx/recyclerview/widget/D$w;->p:Z

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$w;->c()V

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/D$o;->b(Landroidx/recyclerview/widget/D$w;)V

    return-void
.end method

.method a(Landroidx/recyclerview/widget/D$a;Landroidx/recyclerview/widget/D$a;Z)V
    .locals 1

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$o;->a()V

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$o;->d()Landroidx/recyclerview/widget/D$n;

    move-result-object v0

    invoke-virtual {v0, p1, p2, p3}, Landroidx/recyclerview/widget/D$n;->a(Landroidx/recyclerview/widget/D$a;Landroidx/recyclerview/widget/D$a;Z)V

    return-void
.end method

.method a(Landroidx/recyclerview/widget/D$n;)V
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->g:Landroidx/recyclerview/widget/D$n;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$n;->c()V

    :cond_0
    iput-object p1, p0, Landroidx/recyclerview/widget/D$o;->g:Landroidx/recyclerview/widget/D$n;

    iget-object p1, p0, Landroidx/recyclerview/widget/D$o;->g:Landroidx/recyclerview/widget/D$n;

    if-eqz p1, :cond_1

    iget-object p1, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D;->getAdapter()Landroidx/recyclerview/widget/D$a;

    move-result-object p1

    if-eqz p1, :cond_1

    iget-object p1, p0, Landroidx/recyclerview/widget/D$o;->g:Landroidx/recyclerview/widget/D$n;

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$n;->a()V

    :cond_1
    return-void
.end method

.method a(Landroidx/recyclerview/widget/D$u;)V
    .locals 0

    iput-object p1, p0, Landroidx/recyclerview/widget/D$o;->h:Landroidx/recyclerview/widget/D$u;

    return-void
.end method

.method a(Landroidx/recyclerview/widget/D$w;)V
    .locals 2

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->x:Landroidx/recyclerview/widget/D$p;

    if-eqz v0, :cond_0

    invoke-interface {v0, p1}, Landroidx/recyclerview/widget/D$p;->a(Landroidx/recyclerview/widget/D$w;)V

    :cond_0
    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->v:Landroidx/recyclerview/widget/D$a;

    if-eqz v0, :cond_1

    invoke-virtual {v0, p1}, Landroidx/recyclerview/widget/D$a;->d(Landroidx/recyclerview/widget/D$w;)V

    :cond_1
    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v1, v0, Landroidx/recyclerview/widget/D;->ra:Landroidx/recyclerview/widget/D$t;

    if-eqz v1, :cond_2

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->p:Landroidx/recyclerview/widget/O;

    invoke-virtual {v0, p1}, Landroidx/recyclerview/widget/O;->h(Landroidx/recyclerview/widget/D$w;)V

    :cond_2
    return-void
.end method

.method a(Landroidx/recyclerview/widget/D$w;Z)V
    .locals 3

    invoke-static {p1}, Landroidx/recyclerview/widget/D;->b(Landroidx/recyclerview/widget/D$w;)V

    const/16 v0, 0x4000

    invoke-virtual {p1, v0}, Landroidx/recyclerview/widget/D$w;->b(I)Z

    move-result v1

    const/4 v2, 0x0

    if-eqz v1, :cond_0

    const/4 v1, 0x0

    invoke-virtual {p1, v1, v0}, Landroidx/recyclerview/widget/D$w;->a(II)V

    iget-object v0, p1, Landroidx/recyclerview/widget/D$w;->b:Landroid/view/View;

    invoke-static {v0, v2}, La/g/i/s;->a(Landroid/view/View;La/g/i/a;)V

    :cond_0
    if-eqz p2, :cond_1

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/D$o;->a(Landroidx/recyclerview/widget/D$w;)V

    :cond_1
    iput-object v2, p1, Landroidx/recyclerview/widget/D$w;->s:Landroidx/recyclerview/widget/D;

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$o;->d()Landroidx/recyclerview/widget/D$n;

    move-result-object p2

    invoke-virtual {p2, p1}, Landroidx/recyclerview/widget/D$n;->a(Landroidx/recyclerview/widget/D$w;)V

    return-void
.end method

.method b(IZ)Landroid/view/View;
    .locals 2

    const-wide v0, 0x7fffffffffffffffL

    invoke-virtual {p0, p1, p2, v0, v1}, Landroidx/recyclerview/widget/D$o;->a(IZJ)Landroidx/recyclerview/widget/D$w;

    move-result-object p1

    iget-object p1, p1, Landroidx/recyclerview/widget/D$w;->b:Landroid/view/View;

    return-object p1
.end method

.method b(I)Landroidx/recyclerview/widget/D$w;
    .locals 9

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->b:Ljava/util/ArrayList;

    const/4 v1, 0x0

    if-eqz v0, :cond_4

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    if-nez v0, :cond_0

    goto :goto_2

    :cond_0
    const/4 v2, 0x0

    move v3, v2

    :goto_0
    const/16 v4, 0x20

    if-ge v3, v0, :cond_2

    iget-object v5, p0, Landroidx/recyclerview/widget/D$o;->b:Ljava/util/ArrayList;

    invoke-virtual {v5, v3}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v5

    check-cast v5, Landroidx/recyclerview/widget/D$w;

    invoke-virtual {v5}, Landroidx/recyclerview/widget/D$w;->z()Z

    move-result v6

    if-nez v6, :cond_1

    invoke-virtual {v5}, Landroidx/recyclerview/widget/D$w;->i()I

    move-result v6

    if-ne v6, p1, :cond_1

    invoke-virtual {v5, v4}, Landroidx/recyclerview/widget/D$w;->a(I)V

    return-object v5

    :cond_1
    add-int/lit8 v3, v3, 0x1

    goto :goto_0

    :cond_2
    iget-object v3, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v3, v3, Landroidx/recyclerview/widget/D;->v:Landroidx/recyclerview/widget/D$a;

    invoke-virtual {v3}, Landroidx/recyclerview/widget/D$a;->b()Z

    move-result v3

    if-eqz v3, :cond_4

    iget-object v3, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v3, v3, Landroidx/recyclerview/widget/D;->n:Landroidx/recyclerview/widget/a;

    invoke-virtual {v3, p1}, Landroidx/recyclerview/widget/a;->b(I)I

    move-result p1

    if-lez p1, :cond_4

    iget-object v3, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v3, v3, Landroidx/recyclerview/widget/D;->v:Landroidx/recyclerview/widget/D$a;

    invoke-virtual {v3}, Landroidx/recyclerview/widget/D$a;->a()I

    move-result v3

    if-ge p1, v3, :cond_4

    iget-object v3, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v3, v3, Landroidx/recyclerview/widget/D;->v:Landroidx/recyclerview/widget/D$a;

    invoke-virtual {v3, p1}, Landroidx/recyclerview/widget/D$a;->a(I)J

    move-result-wide v5

    :goto_1
    if-ge v2, v0, :cond_4

    iget-object p1, p0, Landroidx/recyclerview/widget/D$o;->b:Ljava/util/ArrayList;

    invoke-virtual {p1, v2}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object p1

    check-cast p1, Landroidx/recyclerview/widget/D$w;

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$w;->z()Z

    move-result v3

    if-nez v3, :cond_3

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$w;->g()J

    move-result-wide v7

    cmp-long v3, v7, v5

    if-nez v3, :cond_3

    invoke-virtual {p1, v4}, Landroidx/recyclerview/widget/D$w;->a(I)V

    return-object p1

    :cond_3
    add-int/lit8 v2, v2, 0x1

    goto :goto_1

    :cond_4
    :goto_2
    return-object v1
.end method

.method b()V
    .locals 4

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    const/4 v1, 0x0

    move v2, v1

    :goto_0
    if-ge v2, v0, :cond_0

    iget-object v3, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {v3, v2}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v3

    check-cast v3, Landroidx/recyclerview/widget/D$w;

    invoke-virtual {v3}, Landroidx/recyclerview/widget/D$w;->a()V

    add-int/lit8 v2, v2, 0x1

    goto :goto_0

    :cond_0
    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->a:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    move v2, v1

    :goto_1
    if-ge v2, v0, :cond_1

    iget-object v3, p0, Landroidx/recyclerview/widget/D$o;->a:Ljava/util/ArrayList;

    invoke-virtual {v3, v2}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v3

    check-cast v3, Landroidx/recyclerview/widget/D$w;

    invoke-virtual {v3}, Landroidx/recyclerview/widget/D$w;->a()V

    add-int/lit8 v2, v2, 0x1

    goto :goto_1

    :cond_1
    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->b:Ljava/util/ArrayList;

    if-eqz v0, :cond_2

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    :goto_2
    if-ge v1, v0, :cond_2

    iget-object v2, p0, Landroidx/recyclerview/widget/D$o;->b:Ljava/util/ArrayList;

    invoke-virtual {v2, v1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, Landroidx/recyclerview/widget/D$w;

    invoke-virtual {v2}, Landroidx/recyclerview/widget/D$w;->a()V

    add-int/lit8 v1, v1, 0x1

    goto :goto_2

    :cond_2
    return-void
.end method

.method b(II)V
    .locals 8

    if-ge p1, p2, :cond_0

    const/4 v0, -0x1

    move v1, p2

    move v2, v0

    move v0, p1

    goto :goto_0

    :cond_0
    const/4 v0, 0x1

    move v1, p1

    move v2, v0

    move v0, p2

    :goto_0
    iget-object v3, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {v3}, Ljava/util/ArrayList;->size()I

    move-result v3

    const/4 v4, 0x0

    move v5, v4

    :goto_1
    if-ge v5, v3, :cond_4

    iget-object v6, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {v6, v5}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v6

    check-cast v6, Landroidx/recyclerview/widget/D$w;

    if-eqz v6, :cond_3

    iget v7, v6, Landroidx/recyclerview/widget/D$w;->d:I

    if-lt v7, v0, :cond_3

    if-le v7, v1, :cond_1

    goto :goto_2

    :cond_1
    if-ne v7, p1, :cond_2

    sub-int v7, p2, p1

    invoke-virtual {v6, v7, v4}, Landroidx/recyclerview/widget/D$w;->a(IZ)V

    goto :goto_2

    :cond_2
    invoke-virtual {v6, v2, v4}, Landroidx/recyclerview/widget/D$w;->a(IZ)V

    :cond_3
    :goto_2
    add-int/lit8 v5, v5, 0x1

    goto :goto_1

    :cond_4
    return-void
.end method

.method public b(Landroid/view/View;)V
    .locals 3

    invoke-static {p1}, Landroidx/recyclerview/widget/D;->g(Landroid/view/View;)Landroidx/recyclerview/widget/D$w;

    move-result-object v0

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$w;->r()Z

    move-result v1

    if-eqz v1, :cond_0

    iget-object v1, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    const/4 v2, 0x0

    invoke-virtual {v1, p1, v2}, Landroidx/recyclerview/widget/D;->removeDetachedView(Landroid/view/View;Z)V

    :cond_0
    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$w;->q()Z

    move-result p1

    if-eqz p1, :cond_1

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$w;->y()V

    goto :goto_0

    :cond_1
    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$w;->z()Z

    move-result p1

    if-eqz p1, :cond_2

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$w;->c()V

    :cond_2
    :goto_0
    invoke-virtual {p0, v0}, Landroidx/recyclerview/widget/D$o;->b(Landroidx/recyclerview/widget/D$w;)V

    return-void
.end method

.method b(Landroidx/recyclerview/widget/D$w;)V
    .locals 6

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$w;->q()Z

    move-result v0

    const/4 v1, 0x0

    const/4 v2, 0x1

    if-nez v0, :cond_d

    iget-object v0, p1, Landroidx/recyclerview/widget/D$w;->b:Landroid/view/View;

    invoke-virtual {v0}, Landroid/view/View;->getParent()Landroid/view/ViewParent;

    move-result-object v0

    if-eqz v0, :cond_0

    goto/16 :goto_6

    :cond_0
    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$w;->r()Z

    move-result v0

    if-nez v0, :cond_c

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$w;->x()Z

    move-result v0

    if-nez v0, :cond_b

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$w;->e()Z

    move-result v0

    iget-object v3, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v3, v3, Landroidx/recyclerview/widget/D;->v:Landroidx/recyclerview/widget/D$a;

    if-eqz v3, :cond_1

    if-eqz v0, :cond_1

    invoke-virtual {v3, p1}, Landroidx/recyclerview/widget/D$a;->a(Landroidx/recyclerview/widget/D$w;)Z

    move-result v3

    if-eqz v3, :cond_1

    move v3, v2

    goto :goto_0

    :cond_1
    move v3, v1

    :goto_0
    if-nez v3, :cond_3

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$w;->o()Z

    move-result v3

    if-eqz v3, :cond_2

    goto :goto_1

    :cond_2
    move v3, v1

    goto :goto_5

    :cond_3
    :goto_1
    iget v3, p0, Landroidx/recyclerview/widget/D$o;->f:I

    if-lez v3, :cond_8

    const/16 v3, 0x20e

    invoke-virtual {p1, v3}, Landroidx/recyclerview/widget/D$w;->b(I)Z

    move-result v3

    if-nez v3, :cond_8

    iget-object v3, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {v3}, Ljava/util/ArrayList;->size()I

    move-result v3

    iget v4, p0, Landroidx/recyclerview/widget/D$o;->f:I

    if-lt v3, v4, :cond_4

    if-lez v3, :cond_4

    invoke-virtual {p0, v1}, Landroidx/recyclerview/widget/D$o;->e(I)V

    add-int/lit8 v3, v3, -0x1

    :cond_4
    sget-boolean v4, Landroidx/recyclerview/widget/D;->f:Z

    if-eqz v4, :cond_7

    if-lez v3, :cond_7

    iget-object v4, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v4, v4, Landroidx/recyclerview/widget/D;->qa:Landroidx/recyclerview/widget/p$a;

    iget v5, p1, Landroidx/recyclerview/widget/D$w;->d:I

    invoke-virtual {v4, v5}, Landroidx/recyclerview/widget/p$a;->a(I)Z

    move-result v4

    if-nez v4, :cond_7

    add-int/lit8 v3, v3, -0x1

    :goto_2
    if-ltz v3, :cond_6

    iget-object v4, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {v4, v3}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v4

    check-cast v4, Landroidx/recyclerview/widget/D$w;

    iget v4, v4, Landroidx/recyclerview/widget/D$w;->d:I

    iget-object v5, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v5, v5, Landroidx/recyclerview/widget/D;->qa:Landroidx/recyclerview/widget/p$a;

    invoke-virtual {v5, v4}, Landroidx/recyclerview/widget/p$a;->a(I)Z

    move-result v4

    if-nez v4, :cond_5

    goto :goto_3

    :cond_5
    add-int/lit8 v3, v3, -0x1

    goto :goto_2

    :cond_6
    :goto_3
    add-int/2addr v3, v2

    :cond_7
    iget-object v4, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {v4, v3, p1}, Ljava/util/ArrayList;->add(ILjava/lang/Object;)V

    move v3, v2

    goto :goto_4

    :cond_8
    move v3, v1

    :goto_4
    if-nez v3, :cond_9

    invoke-virtual {p0, p1, v2}, Landroidx/recyclerview/widget/D$o;->a(Landroidx/recyclerview/widget/D$w;Z)V

    move v1, v2

    :cond_9
    :goto_5
    iget-object v2, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v2, v2, Landroidx/recyclerview/widget/D;->p:Landroidx/recyclerview/widget/O;

    invoke-virtual {v2, p1}, Landroidx/recyclerview/widget/O;->h(Landroidx/recyclerview/widget/D$w;)V

    if-nez v3, :cond_a

    if-nez v1, :cond_a

    if-eqz v0, :cond_a

    const/4 v0, 0x0

    iput-object v0, p1, Landroidx/recyclerview/widget/D$w;->s:Landroidx/recyclerview/widget/D;

    :cond_a
    return-void

    :cond_b
    new-instance p1, Ljava/lang/IllegalArgumentException;

    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "Trying to recycle an ignored view holder. You should first call stopIgnoringView(view) before calling recycle."

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-object v1, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    invoke-virtual {v1}, Landroidx/recyclerview/widget/D;->i()Ljava/lang/String;

    move-result-object v1

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-direct {p1, v0}, Ljava/lang/IllegalArgumentException;-><init>(Ljava/lang/String;)V

    throw p1

    :cond_c
    new-instance v0, Ljava/lang/IllegalArgumentException;

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    const-string v2, "Tmp detached view should be removed from RecyclerView before it can be recycled: "

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    iget-object p1, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D;->i()Ljava/lang/String;

    move-result-object p1

    invoke-virtual {v1, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p1

    invoke-direct {v0, p1}, Ljava/lang/IllegalArgumentException;-><init>(Ljava/lang/String;)V

    throw v0

    :cond_d
    :goto_6
    new-instance v0, Ljava/lang/IllegalArgumentException;

    new-instance v3, Ljava/lang/StringBuilder;

    invoke-direct {v3}, Ljava/lang/StringBuilder;-><init>()V

    const-string v4, "Scrapped or attached views may not be recycled. isScrap:"

    invoke-virtual {v3, v4}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$w;->q()Z

    move-result v4

    invoke-virtual {v3, v4}, Ljava/lang/StringBuilder;->append(Z)Ljava/lang/StringBuilder;

    const-string v4, " isAttached:"

    invoke-virtual {v3, v4}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-object p1, p1, Landroidx/recyclerview/widget/D$w;->b:Landroid/view/View;

    invoke-virtual {p1}, Landroid/view/View;->getParent()Landroid/view/ViewParent;

    move-result-object p1

    if-eqz p1, :cond_e

    move v1, v2

    :cond_e
    invoke-virtual {v3, v1}, Ljava/lang/StringBuilder;->append(Z)Ljava/lang/StringBuilder;

    iget-object p1, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D;->i()Ljava/lang/String;

    move-result-object p1

    invoke-virtual {v3, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v3}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p1

    invoke-direct {v0, p1}, Ljava/lang/IllegalArgumentException;-><init>(Ljava/lang/String;)V

    throw v0
.end method

.method c(I)Landroid/view/View;
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->a:Ljava/util/ArrayList;

    invoke-virtual {v0, p1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object p1

    check-cast p1, Landroidx/recyclerview/widget/D$w;

    iget-object p1, p1, Landroidx/recyclerview/widget/D$w;->b:Landroid/view/View;

    return-object p1
.end method

.method c()V
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->a:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->clear()V

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->b:Ljava/util/ArrayList;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, Ljava/util/ArrayList;->clear()V

    :cond_0
    return-void
.end method

.method c(II)V
    .locals 3

    add-int/2addr p2, p1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    add-int/lit8 v0, v0, -0x1

    :goto_0
    if-ltz v0, :cond_2

    iget-object v1, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {v1, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, Landroidx/recyclerview/widget/D$w;

    if-nez v1, :cond_0

    goto :goto_1

    :cond_0
    iget v2, v1, Landroidx/recyclerview/widget/D$w;->d:I

    if-lt v2, p1, :cond_1

    if-ge v2, p2, :cond_1

    const/4 v2, 0x2

    invoke-virtual {v1, v2}, Landroidx/recyclerview/widget/D$w;->a(I)V

    invoke-virtual {p0, v0}, Landroidx/recyclerview/widget/D$o;->e(I)V

    :cond_1
    :goto_1
    add-int/lit8 v0, v0, -0x1

    goto :goto_0

    :cond_2
    return-void
.end method

.method c(Landroid/view/View;)V
    .locals 2

    invoke-static {p1}, Landroidx/recyclerview/widget/D;->g(Landroid/view/View;)Landroidx/recyclerview/widget/D$w;

    move-result-object p1

    const/16 v0, 0xc

    invoke-virtual {p1, v0}, Landroidx/recyclerview/widget/D$w;->b(I)Z

    move-result v0

    if-nez v0, :cond_2

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$w;->s()Z

    move-result v0

    if-eqz v0, :cond_2

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    invoke-virtual {v0, p1}, Landroidx/recyclerview/widget/D;->a(Landroidx/recyclerview/widget/D$w;)Z

    move-result v0

    if-eqz v0, :cond_0

    goto :goto_0

    :cond_0
    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->b:Ljava/util/ArrayList;

    if-nez v0, :cond_1

    new-instance v0, Ljava/util/ArrayList;

    invoke-direct {v0}, Ljava/util/ArrayList;-><init>()V

    iput-object v0, p0, Landroidx/recyclerview/widget/D$o;->b:Ljava/util/ArrayList;

    :cond_1
    const/4 v0, 0x1

    invoke-virtual {p1, p0, v0}, Landroidx/recyclerview/widget/D$w;->a(Landroidx/recyclerview/widget/D$o;Z)V

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->b:Ljava/util/ArrayList;

    goto :goto_2

    :cond_2
    :goto_0
    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$w;->n()Z

    move-result v0

    if-eqz v0, :cond_4

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$w;->p()Z

    move-result v0

    if-nez v0, :cond_4

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->v:Landroidx/recyclerview/widget/D$a;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$a;->b()Z

    move-result v0

    if-eqz v0, :cond_3

    goto :goto_1

    :cond_3
    new-instance p1, Ljava/lang/IllegalArgumentException;

    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "Called scrap view with an invalid view. Invalid views cannot be reused from scrap, they should rebound from recycler pool."

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-object v1, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    invoke-virtual {v1}, Landroidx/recyclerview/widget/D;->i()Ljava/lang/String;

    move-result-object v1

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-direct {p1, v0}, Ljava/lang/IllegalArgumentException;-><init>(Ljava/lang/String;)V

    throw p1

    :cond_4
    :goto_1
    const/4 v0, 0x0

    invoke-virtual {p1, p0, v0}, Landroidx/recyclerview/widget/D$w;->a(Landroidx/recyclerview/widget/D$o;Z)V

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->a:Ljava/util/ArrayList;

    :goto_2
    invoke-virtual {v0, p1}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    return-void
.end method

.method c(Landroidx/recyclerview/widget/D$w;)V
    .locals 1

    iget-boolean v0, p1, Landroidx/recyclerview/widget/D$w;->p:Z

    if-eqz v0, :cond_0

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->b:Ljava/util/ArrayList;

    goto :goto_0

    :cond_0
    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->a:Ljava/util/ArrayList;

    :goto_0
    invoke-virtual {v0, p1}, Ljava/util/ArrayList;->remove(Ljava/lang/Object;)Z

    const/4 v0, 0x0

    iput-object v0, p1, Landroidx/recyclerview/widget/D$w;->o:Landroidx/recyclerview/widget/D$o;

    const/4 v0, 0x0

    iput-boolean v0, p1, Landroidx/recyclerview/widget/D$w;->p:Z

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$w;->c()V

    return-void
.end method

.method public d(I)Landroid/view/View;
    .locals 1

    const/4 v0, 0x0

    invoke-virtual {p0, p1, v0}, Landroidx/recyclerview/widget/D$o;->b(IZ)Landroid/view/View;

    move-result-object p1

    return-object p1
.end method

.method d()Landroidx/recyclerview/widget/D$n;
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->g:Landroidx/recyclerview/widget/D$n;

    if-nez v0, :cond_0

    new-instance v0, Landroidx/recyclerview/widget/D$n;

    invoke-direct {v0}, Landroidx/recyclerview/widget/D$n;-><init>()V

    iput-object v0, p0, Landroidx/recyclerview/widget/D$o;->g:Landroidx/recyclerview/widget/D$n;

    :cond_0
    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->g:Landroidx/recyclerview/widget/D$n;

    return-object v0
.end method

.method d(Landroidx/recyclerview/widget/D$w;)Z
    .locals 7

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$w;->p()Z

    move-result v0

    if-eqz v0, :cond_0

    iget-object p1, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object p1, p1, Landroidx/recyclerview/widget/D;->ra:Landroidx/recyclerview/widget/D$t;

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$t;->d()Z

    move-result p1

    return p1

    :cond_0
    iget v0, p1, Landroidx/recyclerview/widget/D$w;->d:I

    if-ltz v0, :cond_4

    iget-object v1, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v1, v1, Landroidx/recyclerview/widget/D;->v:Landroidx/recyclerview/widget/D$a;

    invoke-virtual {v1}, Landroidx/recyclerview/widget/D$a;->a()I

    move-result v1

    if-ge v0, v1, :cond_4

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->ra:Landroidx/recyclerview/widget/D$t;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$t;->d()Z

    move-result v0

    const/4 v1, 0x0

    if-nez v0, :cond_1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->v:Landroidx/recyclerview/widget/D$a;

    iget v2, p1, Landroidx/recyclerview/widget/D$w;->d:I

    invoke-virtual {v0, v2}, Landroidx/recyclerview/widget/D$a;->b(I)I

    move-result v0

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$w;->h()I

    move-result v2

    if-eq v0, v2, :cond_1

    return v1

    :cond_1
    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->v:Landroidx/recyclerview/widget/D$a;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$a;->b()Z

    move-result v0

    const/4 v2, 0x1

    if-eqz v0, :cond_3

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$w;->g()J

    move-result-wide v3

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->v:Landroidx/recyclerview/widget/D$a;

    iget p1, p1, Landroidx/recyclerview/widget/D$w;->d:I

    invoke-virtual {v0, p1}, Landroidx/recyclerview/widget/D$a;->a(I)J

    move-result-wide v5

    cmp-long p1, v3, v5

    if-nez p1, :cond_2

    move v1, v2

    :cond_2
    return v1

    :cond_3
    return v2

    :cond_4
    new-instance v0, Ljava/lang/IndexOutOfBoundsException;

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    const-string v2, "Inconsistency detected. Invalid view holder adapter position"

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    iget-object p1, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D;->i()Ljava/lang/String;

    move-result-object p1

    invoke-virtual {v1, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p1

    invoke-direct {v0, p1}, Ljava/lang/IndexOutOfBoundsException;-><init>(Ljava/lang/String;)V

    throw v0
.end method

.method e()I
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->a:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    return v0
.end method

.method e(I)V
    .locals 2

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {v0, p1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v0

    check-cast v0, Landroidx/recyclerview/widget/D$w;

    const/4 v1, 0x1

    invoke-virtual {p0, v0, v1}, Landroidx/recyclerview/widget/D$o;->a(Landroidx/recyclerview/widget/D$w;Z)V

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {v0, p1}, Ljava/util/ArrayList;->remove(I)Ljava/lang/Object;

    return-void
.end method

.method public f()Ljava/util/List;
    .locals 1
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "()",
            "Ljava/util/List<",
            "Landroidx/recyclerview/widget/D$w;",
            ">;"
        }
    .end annotation

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->d:Ljava/util/List;

    return-object v0
.end method

.method public f(I)V
    .locals 0

    iput p1, p0, Landroidx/recyclerview/widget/D$o;->e:I

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$o;->j()V

    return-void
.end method

.method g()V
    .locals 4

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    const/4 v1, 0x0

    :goto_0
    if-ge v1, v0, :cond_1

    iget-object v2, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {v2, v1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, Landroidx/recyclerview/widget/D$w;

    iget-object v2, v2, Landroidx/recyclerview/widget/D$w;->b:Landroid/view/View;

    invoke-virtual {v2}, Landroid/view/View;->getLayoutParams()Landroid/view/ViewGroup$LayoutParams;

    move-result-object v2

    check-cast v2, Landroidx/recyclerview/widget/D$i;

    if-eqz v2, :cond_0

    const/4 v3, 0x1

    iput-boolean v3, v2, Landroidx/recyclerview/widget/D$i;->c:Z

    :cond_0
    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_1
    return-void
.end method

.method h()V
    .locals 4

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    const/4 v1, 0x0

    :goto_0
    if-ge v1, v0, :cond_1

    iget-object v2, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {v2, v1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, Landroidx/recyclerview/widget/D$w;

    if-eqz v2, :cond_0

    const/4 v3, 0x6

    invoke-virtual {v2, v3}, Landroidx/recyclerview/widget/D$w;->a(I)V

    const/4 v3, 0x0

    invoke-virtual {v2, v3}, Landroidx/recyclerview/widget/D$w;->a(Ljava/lang/Object;)V

    :cond_0
    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_1
    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->v:Landroidx/recyclerview/widget/D$a;

    if-eqz v0, :cond_2

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$a;->b()Z

    move-result v0

    if-nez v0, :cond_3

    :cond_2
    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$o;->i()V

    :cond_3
    return-void
.end method

.method i()V
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    add-int/lit8 v0, v0, -0x1

    :goto_0
    if-ltz v0, :cond_0

    invoke-virtual {p0, v0}, Landroidx/recyclerview/widget/D$o;->e(I)V

    add-int/lit8 v0, v0, -0x1

    goto :goto_0

    :cond_0
    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->clear()V

    sget-boolean v0, Landroidx/recyclerview/widget/D;->f:Z

    if-eqz v0, :cond_1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->qa:Landroidx/recyclerview/widget/p$a;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/p$a;->a()V

    :cond_1
    return-void
.end method

.method j()V
    .locals 3

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->i:Landroidx/recyclerview/widget/D;

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->w:Landroidx/recyclerview/widget/D$h;

    if-eqz v0, :cond_0

    iget v0, v0, Landroidx/recyclerview/widget/D$h;->m:I

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    iget v1, p0, Landroidx/recyclerview/widget/D$o;->e:I

    add-int/2addr v1, v0

    iput v1, p0, Landroidx/recyclerview/widget/D$o;->f:I

    iget-object v0, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    add-int/lit8 v0, v0, -0x1

    :goto_1
    if-ltz v0, :cond_1

    iget-object v1, p0, Landroidx/recyclerview/widget/D$o;->c:Ljava/util/ArrayList;

    invoke-virtual {v1}, Ljava/util/ArrayList;->size()I

    move-result v1

    iget v2, p0, Landroidx/recyclerview/widget/D$o;->f:I

    if-le v1, v2, :cond_1

    invoke-virtual {p0, v0}, Landroidx/recyclerview/widget/D$o;->e(I)V

    add-int/lit8 v0, v0, -0x1

    goto :goto_1

    :cond_1
    return-void
.end method
