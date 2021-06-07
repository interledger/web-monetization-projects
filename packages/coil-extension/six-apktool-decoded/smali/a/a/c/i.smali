.class public La/a/c/i;
.super Ljava/lang/Object;
.source ""


# instance fields
.field final a:Ljava/util/ArrayList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/ArrayList<",
            "La/g/i/y;",
            ">;"
        }
    .end annotation
.end field

.field private b:J

.field private c:Landroid/view/animation/Interpolator;

.field d:La/g/i/z;

.field private e:Z

.field private final f:La/g/i/A;


# direct methods
.method public constructor <init>()V
    .locals 2

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    const-wide/16 v0, -0x1

    iput-wide v0, p0, La/a/c/i;->b:J

    new-instance v0, La/a/c/h;

    invoke-direct {v0, p0}, La/a/c/h;-><init>(La/a/c/i;)V

    iput-object v0, p0, La/a/c/i;->f:La/g/i/A;

    new-instance v0, Ljava/util/ArrayList;

    invoke-direct {v0}, Ljava/util/ArrayList;-><init>()V

    iput-object v0, p0, La/a/c/i;->a:Ljava/util/ArrayList;

    return-void
.end method


# virtual methods
.method public a(J)La/a/c/i;
    .locals 1

    iget-boolean v0, p0, La/a/c/i;->e:Z

    if-nez v0, :cond_0

    iput-wide p1, p0, La/a/c/i;->b:J

    :cond_0
    return-object p0
.end method

.method public a(La/g/i/y;)La/a/c/i;
    .locals 1

    iget-boolean v0, p0, La/a/c/i;->e:Z

    if-nez v0, :cond_0

    iget-object v0, p0, La/a/c/i;->a:Ljava/util/ArrayList;

    invoke-virtual {v0, p1}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    :cond_0
    return-object p0
.end method

.method public a(La/g/i/y;La/g/i/y;)La/a/c/i;
    .locals 2

    iget-object v0, p0, La/a/c/i;->a:Ljava/util/ArrayList;

    invoke-virtual {v0, p1}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    invoke-virtual {p1}, La/g/i/y;->b()J

    move-result-wide v0

    invoke-virtual {p2, v0, v1}, La/g/i/y;->b(J)La/g/i/y;

    iget-object p1, p0, La/a/c/i;->a:Ljava/util/ArrayList;

    invoke-virtual {p1, p2}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    return-object p0
.end method

.method public a(La/g/i/z;)La/a/c/i;
    .locals 1

    iget-boolean v0, p0, La/a/c/i;->e:Z

    if-nez v0, :cond_0

    iput-object p1, p0, La/a/c/i;->d:La/g/i/z;

    :cond_0
    return-object p0
.end method

.method public a(Landroid/view/animation/Interpolator;)La/a/c/i;
    .locals 1

    iget-boolean v0, p0, La/a/c/i;->e:Z

    if-nez v0, :cond_0

    iput-object p1, p0, La/a/c/i;->c:Landroid/view/animation/Interpolator;

    :cond_0
    return-object p0
.end method

.method public a()V
    .locals 2

    iget-boolean v0, p0, La/a/c/i;->e:Z

    if-nez v0, :cond_0

    return-void

    :cond_0
    iget-object v0, p0, La/a/c/i;->a:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->iterator()Ljava/util/Iterator;

    move-result-object v0

    :goto_0
    invoke-interface {v0}, Ljava/util/Iterator;->hasNext()Z

    move-result v1

    if-eqz v1, :cond_1

    invoke-interface {v0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/g/i/y;

    invoke-virtual {v1}, La/g/i/y;->a()V

    goto :goto_0

    :cond_1
    const/4 v0, 0x0

    iput-boolean v0, p0, La/a/c/i;->e:Z

    return-void
.end method

.method b()V
    .locals 1

    const/4 v0, 0x0

    iput-boolean v0, p0, La/a/c/i;->e:Z

    return-void
.end method

.method public c()V
    .locals 6

    iget-boolean v0, p0, La/a/c/i;->e:Z

    if-eqz v0, :cond_0

    return-void

    :cond_0
    iget-object v0, p0, La/a/c/i;->a:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->iterator()Ljava/util/Iterator;

    move-result-object v0

    :goto_0
    invoke-interface {v0}, Ljava/util/Iterator;->hasNext()Z

    move-result v1

    if-eqz v1, :cond_4

    invoke-interface {v0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/g/i/y;

    iget-wide v2, p0, La/a/c/i;->b:J

    const-wide/16 v4, 0x0

    cmp-long v4, v2, v4

    if-ltz v4, :cond_1

    invoke-virtual {v1, v2, v3}, La/g/i/y;->a(J)La/g/i/y;

    :cond_1
    iget-object v2, p0, La/a/c/i;->c:Landroid/view/animation/Interpolator;

    if-eqz v2, :cond_2

    invoke-virtual {v1, v2}, La/g/i/y;->a(Landroid/view/animation/Interpolator;)La/g/i/y;

    :cond_2
    iget-object v2, p0, La/a/c/i;->d:La/g/i/z;

    if-eqz v2, :cond_3

    iget-object v2, p0, La/a/c/i;->f:La/g/i/A;

    invoke-virtual {v1, v2}, La/g/i/y;->a(La/g/i/z;)La/g/i/y;

    :cond_3
    invoke-virtual {v1}, La/g/i/y;->c()V

    goto :goto_0

    :cond_4
    const/4 v0, 0x1

    iput-boolean v0, p0, La/a/c/i;->e:Z

    return-void
.end method
