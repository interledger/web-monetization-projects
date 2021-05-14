.class final Landroidx/recyclerview/widget/p;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/MemberClasses;
    value = {
        Landroidx/recyclerview/widget/p$a;,
        Landroidx/recyclerview/widget/p$b;
    }
.end annotation


# static fields
.field static final a:Ljava/lang/ThreadLocal;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/lang/ThreadLocal<",
            "Landroidx/recyclerview/widget/p;",
            ">;"
        }
    .end annotation
.end field

.field static b:Ljava/util/Comparator;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/Comparator<",
            "Landroidx/recyclerview/widget/p$b;",
            ">;"
        }
    .end annotation
.end field


# instance fields
.field c:Ljava/util/ArrayList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/ArrayList<",
            "Landroidx/recyclerview/widget/D;",
            ">;"
        }
    .end annotation
.end field

.field d:J

.field e:J

.field private f:Ljava/util/ArrayList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/ArrayList<",
            "Landroidx/recyclerview/widget/p$b;",
            ">;"
        }
    .end annotation
.end field


# direct methods
.method static constructor <clinit>()V
    .locals 1

    new-instance v0, Ljava/lang/ThreadLocal;

    invoke-direct {v0}, Ljava/lang/ThreadLocal;-><init>()V

    sput-object v0, Landroidx/recyclerview/widget/p;->a:Ljava/lang/ThreadLocal;

    new-instance v0, Landroidx/recyclerview/widget/o;

    invoke-direct {v0}, Landroidx/recyclerview/widget/o;-><init>()V

    sput-object v0, Landroidx/recyclerview/widget/p;->b:Ljava/util/Comparator;

    return-void
.end method

.method constructor <init>()V
    .locals 1

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    new-instance v0, Ljava/util/ArrayList;

    invoke-direct {v0}, Ljava/util/ArrayList;-><init>()V

    iput-object v0, p0, Landroidx/recyclerview/widget/p;->c:Ljava/util/ArrayList;

    new-instance v0, Ljava/util/ArrayList;

    invoke-direct {v0}, Ljava/util/ArrayList;-><init>()V

    iput-object v0, p0, Landroidx/recyclerview/widget/p;->f:Ljava/util/ArrayList;

    return-void
.end method

.method private a(Landroidx/recyclerview/widget/D;IJ)Landroidx/recyclerview/widget/D$w;
    .locals 2

    invoke-static {p1, p2}, Landroidx/recyclerview/widget/p;->a(Landroidx/recyclerview/widget/D;I)Z

    move-result v0

    if-eqz v0, :cond_0

    const/4 p1, 0x0

    return-object p1

    :cond_0
    iget-object v0, p1, Landroidx/recyclerview/widget/D;->l:Landroidx/recyclerview/widget/D$o;

    const/4 v1, 0x0

    :try_start_0
    invoke-virtual {p1}, Landroidx/recyclerview/widget/D;->q()V

    invoke-virtual {v0, p2, v1, p3, p4}, Landroidx/recyclerview/widget/D$o;->a(IZJ)Landroidx/recyclerview/widget/D$w;

    move-result-object p2

    if-eqz p2, :cond_2

    invoke-virtual {p2}, Landroidx/recyclerview/widget/D$w;->m()Z

    move-result p3

    if-eqz p3, :cond_1

    invoke-virtual {p2}, Landroidx/recyclerview/widget/D$w;->n()Z

    move-result p3

    if-nez p3, :cond_1

    iget-object p3, p2, Landroidx/recyclerview/widget/D$w;->b:Landroid/view/View;

    invoke-virtual {v0, p3}, Landroidx/recyclerview/widget/D$o;->b(Landroid/view/View;)V

    goto :goto_0

    :cond_1
    invoke-virtual {v0, p2, v1}, Landroidx/recyclerview/widget/D$o;->a(Landroidx/recyclerview/widget/D$w;Z)V
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    :cond_2
    :goto_0
    invoke-virtual {p1, v1}, Landroidx/recyclerview/widget/D;->a(Z)V

    return-object p2

    :catchall_0
    move-exception p2

    invoke-virtual {p1, v1}, Landroidx/recyclerview/widget/D;->a(Z)V

    throw p2
.end method

.method private a()V
    .locals 11

    iget-object v0, p0, Landroidx/recyclerview/widget/p;->c:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    const/4 v1, 0x0

    move v2, v1

    move v3, v2

    :goto_0
    if-ge v2, v0, :cond_1

    iget-object v4, p0, Landroidx/recyclerview/widget/p;->c:Ljava/util/ArrayList;

    invoke-virtual {v4, v2}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v4

    check-cast v4, Landroidx/recyclerview/widget/D;

    invoke-virtual {v4}, Landroid/view/ViewGroup;->getWindowVisibility()I

    move-result v5

    if-nez v5, :cond_0

    iget-object v5, v4, Landroidx/recyclerview/widget/D;->qa:Landroidx/recyclerview/widget/p$a;

    invoke-virtual {v5, v4, v1}, Landroidx/recyclerview/widget/p$a;->a(Landroidx/recyclerview/widget/D;Z)V

    iget-object v4, v4, Landroidx/recyclerview/widget/D;->qa:Landroidx/recyclerview/widget/p$a;

    iget v4, v4, Landroidx/recyclerview/widget/p$a;->d:I

    add-int/2addr v3, v4

    :cond_0
    add-int/lit8 v2, v2, 0x1

    goto :goto_0

    :cond_1
    iget-object v2, p0, Landroidx/recyclerview/widget/p;->f:Ljava/util/ArrayList;

    invoke-virtual {v2, v3}, Ljava/util/ArrayList;->ensureCapacity(I)V

    move v2, v1

    move v3, v2

    :goto_1
    if-ge v2, v0, :cond_6

    iget-object v4, p0, Landroidx/recyclerview/widget/p;->c:Ljava/util/ArrayList;

    invoke-virtual {v4, v2}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v4

    check-cast v4, Landroidx/recyclerview/widget/D;

    invoke-virtual {v4}, Landroid/view/ViewGroup;->getWindowVisibility()I

    move-result v5

    if-eqz v5, :cond_2

    goto :goto_5

    :cond_2
    iget-object v5, v4, Landroidx/recyclerview/widget/D;->qa:Landroidx/recyclerview/widget/p$a;

    iget v6, v5, Landroidx/recyclerview/widget/p$a;->a:I

    invoke-static {v6}, Ljava/lang/Math;->abs(I)I

    move-result v6

    iget v7, v5, Landroidx/recyclerview/widget/p$a;->b:I

    invoke-static {v7}, Ljava/lang/Math;->abs(I)I

    move-result v7

    add-int/2addr v6, v7

    move v7, v3

    move v3, v1

    :goto_2
    iget v8, v5, Landroidx/recyclerview/widget/p$a;->d:I

    mul-int/lit8 v8, v8, 0x2

    if-ge v3, v8, :cond_5

    iget-object v8, p0, Landroidx/recyclerview/widget/p;->f:Ljava/util/ArrayList;

    invoke-virtual {v8}, Ljava/util/ArrayList;->size()I

    move-result v8

    if-lt v7, v8, :cond_3

    new-instance v8, Landroidx/recyclerview/widget/p$b;

    invoke-direct {v8}, Landroidx/recyclerview/widget/p$b;-><init>()V

    iget-object v9, p0, Landroidx/recyclerview/widget/p;->f:Ljava/util/ArrayList;

    invoke-virtual {v9, v8}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    goto :goto_3

    :cond_3
    iget-object v8, p0, Landroidx/recyclerview/widget/p;->f:Ljava/util/ArrayList;

    invoke-virtual {v8, v7}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v8

    check-cast v8, Landroidx/recyclerview/widget/p$b;

    :goto_3
    iget-object v9, v5, Landroidx/recyclerview/widget/p$a;->c:[I

    add-int/lit8 v10, v3, 0x1

    aget v9, v9, v10

    if-gt v9, v6, :cond_4

    const/4 v10, 0x1

    goto :goto_4

    :cond_4
    move v10, v1

    :goto_4
    iput-boolean v10, v8, Landroidx/recyclerview/widget/p$b;->a:Z

    iput v6, v8, Landroidx/recyclerview/widget/p$b;->b:I

    iput v9, v8, Landroidx/recyclerview/widget/p$b;->c:I

    iput-object v4, v8, Landroidx/recyclerview/widget/p$b;->d:Landroidx/recyclerview/widget/D;

    iget-object v9, v5, Landroidx/recyclerview/widget/p$a;->c:[I

    aget v9, v9, v3

    iput v9, v8, Landroidx/recyclerview/widget/p$b;->e:I

    add-int/lit8 v7, v7, 0x1

    add-int/lit8 v3, v3, 0x2

    goto :goto_2

    :cond_5
    move v3, v7

    :goto_5
    add-int/lit8 v2, v2, 0x1

    goto :goto_1

    :cond_6
    iget-object v0, p0, Landroidx/recyclerview/widget/p;->f:Ljava/util/ArrayList;

    sget-object v1, Landroidx/recyclerview/widget/p;->b:Ljava/util/Comparator;

    invoke-static {v0, v1}, Ljava/util/Collections;->sort(Ljava/util/List;Ljava/util/Comparator;)V

    return-void
.end method

.method private a(Landroidx/recyclerview/widget/D;J)V
    .locals 3

    if-nez p1, :cond_0

    return-void

    :cond_0
    iget-boolean v0, p1, Landroidx/recyclerview/widget/D;->N:Z

    if-eqz v0, :cond_1

    iget-object v0, p1, Landroidx/recyclerview/widget/D;->o:Landroidx/recyclerview/widget/b;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/b;->b()I

    move-result v0

    if-eqz v0, :cond_1

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D;->t()V

    :cond_1
    iget-object v0, p1, Landroidx/recyclerview/widget/D;->qa:Landroidx/recyclerview/widget/p$a;

    const/4 v1, 0x1

    invoke-virtual {v0, p1, v1}, Landroidx/recyclerview/widget/p$a;->a(Landroidx/recyclerview/widget/D;Z)V

    iget v1, v0, Landroidx/recyclerview/widget/p$a;->d:I

    if-eqz v1, :cond_3

    :try_start_0
    const-string v1, "RV Nested Prefetch"

    invoke-static {v1}, La/g/e/a;->a(Ljava/lang/String;)V

    iget-object v1, p1, Landroidx/recyclerview/widget/D;->ra:Landroidx/recyclerview/widget/D$t;

    iget-object v2, p1, Landroidx/recyclerview/widget/D;->v:Landroidx/recyclerview/widget/D$a;

    invoke-virtual {v1, v2}, Landroidx/recyclerview/widget/D$t;->a(Landroidx/recyclerview/widget/D$a;)V

    const/4 v1, 0x0

    :goto_0
    iget v2, v0, Landroidx/recyclerview/widget/p$a;->d:I

    mul-int/lit8 v2, v2, 0x2

    if-ge v1, v2, :cond_2

    iget-object v2, v0, Landroidx/recyclerview/widget/p$a;->c:[I

    aget v2, v2, v1

    invoke-direct {p0, p1, v2, p2, p3}, Landroidx/recyclerview/widget/p;->a(Landroidx/recyclerview/widget/D;IJ)Landroidx/recyclerview/widget/D$w;
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    add-int/lit8 v1, v1, 0x2

    goto :goto_0

    :cond_2
    invoke-static {}, La/g/e/a;->a()V

    goto :goto_1

    :catchall_0
    move-exception p1

    invoke-static {}, La/g/e/a;->a()V

    throw p1

    :cond_3
    :goto_1
    return-void
.end method

.method private a(Landroidx/recyclerview/widget/p$b;J)V
    .locals 3

    iget-boolean v0, p1, Landroidx/recyclerview/widget/p$b;->a:Z

    if-eqz v0, :cond_0

    const-wide v0, 0x7fffffffffffffffL

    goto :goto_0

    :cond_0
    move-wide v0, p2

    :goto_0
    iget-object v2, p1, Landroidx/recyclerview/widget/p$b;->d:Landroidx/recyclerview/widget/D;

    iget p1, p1, Landroidx/recyclerview/widget/p$b;->e:I

    invoke-direct {p0, v2, p1, v0, v1}, Landroidx/recyclerview/widget/p;->a(Landroidx/recyclerview/widget/D;IJ)Landroidx/recyclerview/widget/D$w;

    move-result-object p1

    if-eqz p1, :cond_1

    iget-object v0, p1, Landroidx/recyclerview/widget/D$w;->c:Ljava/lang/ref/WeakReference;

    if-eqz v0, :cond_1

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$w;->m()Z

    move-result v0

    if-eqz v0, :cond_1

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$w;->n()Z

    move-result v0

    if-nez v0, :cond_1

    iget-object p1, p1, Landroidx/recyclerview/widget/D$w;->c:Ljava/lang/ref/WeakReference;

    invoke-virtual {p1}, Ljava/lang/ref/WeakReference;->get()Ljava/lang/Object;

    move-result-object p1

    check-cast p1, Landroidx/recyclerview/widget/D;

    invoke-direct {p0, p1, p2, p3}, Landroidx/recyclerview/widget/p;->a(Landroidx/recyclerview/widget/D;J)V

    :cond_1
    return-void
.end method

.method static a(Landroidx/recyclerview/widget/D;I)Z
    .locals 5

    iget-object v0, p0, Landroidx/recyclerview/widget/D;->o:Landroidx/recyclerview/widget/b;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/b;->b()I

    move-result v0

    const/4 v1, 0x0

    move v2, v1

    :goto_0
    if-ge v2, v0, :cond_1

    iget-object v3, p0, Landroidx/recyclerview/widget/D;->o:Landroidx/recyclerview/widget/b;

    invoke-virtual {v3, v2}, Landroidx/recyclerview/widget/b;->d(I)Landroid/view/View;

    move-result-object v3

    invoke-static {v3}, Landroidx/recyclerview/widget/D;->g(Landroid/view/View;)Landroidx/recyclerview/widget/D$w;

    move-result-object v3

    iget v4, v3, Landroidx/recyclerview/widget/D$w;->d:I

    if-ne v4, p1, :cond_0

    invoke-virtual {v3}, Landroidx/recyclerview/widget/D$w;->n()Z

    move-result v3

    if-nez v3, :cond_0

    const/4 p0, 0x1

    return p0

    :cond_0
    add-int/lit8 v2, v2, 0x1

    goto :goto_0

    :cond_1
    return v1
.end method

.method private b(J)V
    .locals 3

    const/4 v0, 0x0

    :goto_0
    iget-object v1, p0, Landroidx/recyclerview/widget/p;->f:Ljava/util/ArrayList;

    invoke-virtual {v1}, Ljava/util/ArrayList;->size()I

    move-result v1

    if-ge v0, v1, :cond_1

    iget-object v1, p0, Landroidx/recyclerview/widget/p;->f:Ljava/util/ArrayList;

    invoke-virtual {v1, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, Landroidx/recyclerview/widget/p$b;

    iget-object v2, v1, Landroidx/recyclerview/widget/p$b;->d:Landroidx/recyclerview/widget/D;

    if-nez v2, :cond_0

    goto :goto_1

    :cond_0
    invoke-direct {p0, v1, p1, p2}, Landroidx/recyclerview/widget/p;->a(Landroidx/recyclerview/widget/p$b;J)V

    invoke-virtual {v1}, Landroidx/recyclerview/widget/p$b;->a()V

    add-int/lit8 v0, v0, 0x1

    goto :goto_0

    :cond_1
    :goto_1
    return-void
.end method


# virtual methods
.method a(J)V
    .locals 0

    invoke-direct {p0}, Landroidx/recyclerview/widget/p;->a()V

    invoke-direct {p0, p1, p2}, Landroidx/recyclerview/widget/p;->b(J)V

    return-void
.end method

.method public a(Landroidx/recyclerview/widget/D;)V
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/p;->c:Ljava/util/ArrayList;

    invoke-virtual {v0, p1}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    return-void
.end method

.method a(Landroidx/recyclerview/widget/D;II)V
    .locals 4

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D;->isAttachedToWindow()Z

    move-result v0

    if-eqz v0, :cond_0

    iget-wide v0, p0, Landroidx/recyclerview/widget/p;->d:J

    const-wide/16 v2, 0x0

    cmp-long v0, v0, v2

    if-nez v0, :cond_0

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D;->getNanoTime()J

    move-result-wide v0

    iput-wide v0, p0, Landroidx/recyclerview/widget/p;->d:J

    invoke-virtual {p1, p0}, Landroid/view/ViewGroup;->post(Ljava/lang/Runnable;)Z

    :cond_0
    iget-object p1, p1, Landroidx/recyclerview/widget/D;->qa:Landroidx/recyclerview/widget/p$a;

    invoke-virtual {p1, p2, p3}, Landroidx/recyclerview/widget/p$a;->b(II)V

    return-void
.end method

.method public b(Landroidx/recyclerview/widget/D;)V
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/p;->c:Ljava/util/ArrayList;

    invoke-virtual {v0, p1}, Ljava/util/ArrayList;->remove(Ljava/lang/Object;)Z

    return-void
.end method

.method public run()V
    .locals 8

    const-wide/16 v0, 0x0

    :try_start_0
    const-string v2, "RV Prefetch"

    invoke-static {v2}, La/g/e/a;->a(Ljava/lang/String;)V

    iget-object v2, p0, Landroidx/recyclerview/widget/p;->c:Ljava/util/ArrayList;

    invoke-virtual {v2}, Ljava/util/ArrayList;->isEmpty()Z

    move-result v2
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    if-eqz v2, :cond_0

    :goto_0
    iput-wide v0, p0, Landroidx/recyclerview/widget/p;->d:J

    invoke-static {}, La/g/e/a;->a()V

    return-void

    :cond_0
    :try_start_1
    iget-object v2, p0, Landroidx/recyclerview/widget/p;->c:Ljava/util/ArrayList;

    invoke-virtual {v2}, Ljava/util/ArrayList;->size()I

    move-result v2

    const/4 v3, 0x0

    move-wide v4, v0

    :goto_1
    if-ge v3, v2, :cond_2

    iget-object v6, p0, Landroidx/recyclerview/widget/p;->c:Ljava/util/ArrayList;

    invoke-virtual {v6, v3}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v6

    check-cast v6, Landroidx/recyclerview/widget/D;

    invoke-virtual {v6}, Landroid/view/ViewGroup;->getWindowVisibility()I

    move-result v7

    if-nez v7, :cond_1

    invoke-virtual {v6}, Landroid/view/ViewGroup;->getDrawingTime()J

    move-result-wide v6

    invoke-static {v6, v7, v4, v5}, Ljava/lang/Math;->max(JJ)J

    move-result-wide v4

    :cond_1
    add-int/lit8 v3, v3, 0x1

    goto :goto_1

    :cond_2
    cmp-long v2, v4, v0

    if-nez v2, :cond_3

    goto :goto_0

    :cond_3
    sget-object v2, Ljava/util/concurrent/TimeUnit;->MILLISECONDS:Ljava/util/concurrent/TimeUnit;

    invoke-virtual {v2, v4, v5}, Ljava/util/concurrent/TimeUnit;->toNanos(J)J

    move-result-wide v2

    iget-wide v4, p0, Landroidx/recyclerview/widget/p;->e:J

    add-long/2addr v2, v4

    invoke-virtual {p0, v2, v3}, Landroidx/recyclerview/widget/p;->a(J)V
    :try_end_1
    .catchall {:try_start_1 .. :try_end_1} :catchall_0

    iput-wide v0, p0, Landroidx/recyclerview/widget/p;->d:J

    invoke-static {}, La/g/e/a;->a()V

    return-void

    :catchall_0
    move-exception v2

    iput-wide v0, p0, Landroidx/recyclerview/widget/p;->d:J

    invoke-static {}, La/g/e/a;->a()V

    throw v2
.end method
