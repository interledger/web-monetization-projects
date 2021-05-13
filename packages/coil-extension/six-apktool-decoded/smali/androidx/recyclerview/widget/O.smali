.class Landroidx/recyclerview/widget/O;
.super Ljava/lang/Object;
.source ""


# annotations
.annotation system Ldalvik/annotation/MemberClasses;
    value = {
        Landroidx/recyclerview/widget/O$a;,
        Landroidx/recyclerview/widget/O$b;
    }
.end annotation


# instance fields
.field final a:La/d/b;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "La/d/b<",
            "Landroidx/recyclerview/widget/D$w;",
            "Landroidx/recyclerview/widget/O$a;",
            ">;"
        }
    .end annotation
.end field

.field final b:La/d/f;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "La/d/f<",
            "Landroidx/recyclerview/widget/D$w;",
            ">;"
        }
    .end annotation
.end field


# direct methods
.method constructor <init>()V
    .locals 1

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    new-instance v0, La/d/b;

    invoke-direct {v0}, La/d/b;-><init>()V

    iput-object v0, p0, Landroidx/recyclerview/widget/O;->a:La/d/b;

    new-instance v0, La/d/f;

    invoke-direct {v0}, La/d/f;-><init>()V

    iput-object v0, p0, Landroidx/recyclerview/widget/O;->b:La/d/f;

    return-void
.end method

.method private a(Landroidx/recyclerview/widget/D$w;I)Landroidx/recyclerview/widget/D$e$c;
    .locals 4

    iget-object v0, p0, Landroidx/recyclerview/widget/O;->a:La/d/b;

    invoke-virtual {v0, p1}, La/d/i;->a(Ljava/lang/Object;)I

    move-result p1

    const/4 v0, 0x0

    if-gez p1, :cond_0

    return-object v0

    :cond_0
    iget-object v1, p0, Landroidx/recyclerview/widget/O;->a:La/d/b;

    invoke-virtual {v1, p1}, La/d/i;->d(I)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, Landroidx/recyclerview/widget/O$a;

    if-eqz v1, :cond_4

    iget v2, v1, Landroidx/recyclerview/widget/O$a;->b:I

    and-int v3, v2, p2

    if-eqz v3, :cond_4

    not-int v0, p2

    and-int/2addr v0, v2

    iput v0, v1, Landroidx/recyclerview/widget/O$a;->b:I

    const/4 v0, 0x4

    if-ne p2, v0, :cond_1

    iget-object p2, v1, Landroidx/recyclerview/widget/O$a;->c:Landroidx/recyclerview/widget/D$e$c;

    goto :goto_0

    :cond_1
    const/16 v0, 0x8

    if-ne p2, v0, :cond_3

    iget-object p2, v1, Landroidx/recyclerview/widget/O$a;->d:Landroidx/recyclerview/widget/D$e$c;

    :goto_0
    iget v0, v1, Landroidx/recyclerview/widget/O$a;->b:I

    and-int/lit8 v0, v0, 0xc

    if-nez v0, :cond_2

    iget-object v0, p0, Landroidx/recyclerview/widget/O;->a:La/d/b;

    invoke-virtual {v0, p1}, La/d/i;->c(I)Ljava/lang/Object;

    invoke-static {v1}, Landroidx/recyclerview/widget/O$a;->a(Landroidx/recyclerview/widget/O$a;)V

    :cond_2
    return-object p2

    :cond_3
    new-instance p1, Ljava/lang/IllegalArgumentException;

    const-string p2, "Must provide flag PRE or POST"

    invoke-direct {p1, p2}, Ljava/lang/IllegalArgumentException;-><init>(Ljava/lang/String;)V

    throw p1

    :cond_4
    return-object v0
.end method


# virtual methods
.method a(J)Landroidx/recyclerview/widget/D$w;
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/O;->b:La/d/f;

    invoke-virtual {v0, p1, p2}, La/d/f;->b(J)Ljava/lang/Object;

    move-result-object p1

    check-cast p1, Landroidx/recyclerview/widget/D$w;

    return-object p1
.end method

.method a()V
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/O;->a:La/d/b;

    invoke-virtual {v0}, La/d/i;->clear()V

    iget-object v0, p0, Landroidx/recyclerview/widget/O;->b:La/d/f;

    invoke-virtual {v0}, La/d/f;->a()V

    return-void
.end method

.method a(JLandroidx/recyclerview/widget/D$w;)V
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/O;->b:La/d/f;

    invoke-virtual {v0, p1, p2, p3}, La/d/f;->c(JLjava/lang/Object;)V

    return-void
.end method

.method a(Landroidx/recyclerview/widget/D$w;)V
    .locals 2

    iget-object v0, p0, Landroidx/recyclerview/widget/O;->a:La/d/b;

    invoke-virtual {v0, p1}, La/d/i;->get(Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object v0

    check-cast v0, Landroidx/recyclerview/widget/O$a;

    if-nez v0, :cond_0

    invoke-static {}, Landroidx/recyclerview/widget/O$a;->b()Landroidx/recyclerview/widget/O$a;

    move-result-object v0

    iget-object v1, p0, Landroidx/recyclerview/widget/O;->a:La/d/b;

    invoke-virtual {v1, p1, v0}, La/d/i;->put(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;

    :cond_0
    iget p1, v0, Landroidx/recyclerview/widget/O$a;->b:I

    or-int/lit8 p1, p1, 0x1

    iput p1, v0, Landroidx/recyclerview/widget/O$a;->b:I

    return-void
.end method

.method a(Landroidx/recyclerview/widget/D$w;Landroidx/recyclerview/widget/D$e$c;)V
    .locals 2

    iget-object v0, p0, Landroidx/recyclerview/widget/O;->a:La/d/b;

    invoke-virtual {v0, p1}, La/d/i;->get(Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object v0

    check-cast v0, Landroidx/recyclerview/widget/O$a;

    if-nez v0, :cond_0

    invoke-static {}, Landroidx/recyclerview/widget/O$a;->b()Landroidx/recyclerview/widget/O$a;

    move-result-object v0

    iget-object v1, p0, Landroidx/recyclerview/widget/O;->a:La/d/b;

    invoke-virtual {v1, p1, v0}, La/d/i;->put(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;

    :cond_0
    iget p1, v0, Landroidx/recyclerview/widget/O$a;->b:I

    or-int/lit8 p1, p1, 0x2

    iput p1, v0, Landroidx/recyclerview/widget/O$a;->b:I

    iput-object p2, v0, Landroidx/recyclerview/widget/O$a;->c:Landroidx/recyclerview/widget/D$e$c;

    return-void
.end method

.method a(Landroidx/recyclerview/widget/O$b;)V
    .locals 6

    iget-object v0, p0, Landroidx/recyclerview/widget/O;->a:La/d/b;

    invoke-virtual {v0}, La/d/i;->size()I

    move-result v0

    add-int/lit8 v0, v0, -0x1

    :goto_0
    if-ltz v0, :cond_7

    iget-object v1, p0, Landroidx/recyclerview/widget/O;->a:La/d/b;

    invoke-virtual {v1, v0}, La/d/i;->b(I)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, Landroidx/recyclerview/widget/D$w;

    iget-object v2, p0, Landroidx/recyclerview/widget/O;->a:La/d/b;

    invoke-virtual {v2, v0}, La/d/i;->c(I)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, Landroidx/recyclerview/widget/O$a;

    iget v3, v2, Landroidx/recyclerview/widget/O$a;->b:I

    and-int/lit8 v4, v3, 0x3

    const/4 v5, 0x3

    if-ne v4, v5, :cond_0

    :goto_1
    invoke-interface {p1, v1}, Landroidx/recyclerview/widget/O$b;->a(Landroidx/recyclerview/widget/D$w;)V

    goto :goto_4

    :cond_0
    and-int/lit8 v4, v3, 0x1

    if-eqz v4, :cond_2

    iget-object v3, v2, Landroidx/recyclerview/widget/O$a;->c:Landroidx/recyclerview/widget/D$e$c;

    if-nez v3, :cond_1

    goto :goto_1

    :cond_1
    iget-object v4, v2, Landroidx/recyclerview/widget/O$a;->d:Landroidx/recyclerview/widget/D$e$c;

    :goto_2
    invoke-interface {p1, v1, v3, v4}, Landroidx/recyclerview/widget/O$b;->b(Landroidx/recyclerview/widget/D$w;Landroidx/recyclerview/widget/D$e$c;Landroidx/recyclerview/widget/D$e$c;)V

    goto :goto_4

    :cond_2
    and-int/lit8 v4, v3, 0xe

    const/16 v5, 0xe

    if-ne v4, v5, :cond_3

    :goto_3
    iget-object v3, v2, Landroidx/recyclerview/widget/O$a;->c:Landroidx/recyclerview/widget/D$e$c;

    iget-object v4, v2, Landroidx/recyclerview/widget/O$a;->d:Landroidx/recyclerview/widget/D$e$c;

    invoke-interface {p1, v1, v3, v4}, Landroidx/recyclerview/widget/O$b;->a(Landroidx/recyclerview/widget/D$w;Landroidx/recyclerview/widget/D$e$c;Landroidx/recyclerview/widget/D$e$c;)V

    goto :goto_4

    :cond_3
    and-int/lit8 v4, v3, 0xc

    const/16 v5, 0xc

    if-ne v4, v5, :cond_4

    iget-object v3, v2, Landroidx/recyclerview/widget/O$a;->c:Landroidx/recyclerview/widget/D$e$c;

    iget-object v4, v2, Landroidx/recyclerview/widget/O$a;->d:Landroidx/recyclerview/widget/D$e$c;

    invoke-interface {p1, v1, v3, v4}, Landroidx/recyclerview/widget/O$b;->c(Landroidx/recyclerview/widget/D$w;Landroidx/recyclerview/widget/D$e$c;Landroidx/recyclerview/widget/D$e$c;)V

    goto :goto_4

    :cond_4
    and-int/lit8 v4, v3, 0x4

    if-eqz v4, :cond_5

    iget-object v3, v2, Landroidx/recyclerview/widget/O$a;->c:Landroidx/recyclerview/widget/D$e$c;

    const/4 v4, 0x0

    goto :goto_2

    :cond_5
    and-int/lit8 v3, v3, 0x8

    if-eqz v3, :cond_6

    goto :goto_3

    :cond_6
    :goto_4
    invoke-static {v2}, Landroidx/recyclerview/widget/O$a;->a(Landroidx/recyclerview/widget/O$a;)V

    add-int/lit8 v0, v0, -0x1

    goto :goto_0

    :cond_7
    return-void
.end method

.method b()V
    .locals 0

    invoke-static {}, Landroidx/recyclerview/widget/O$a;->a()V

    return-void
.end method

.method b(Landroidx/recyclerview/widget/D$w;Landroidx/recyclerview/widget/D$e$c;)V
    .locals 2

    iget-object v0, p0, Landroidx/recyclerview/widget/O;->a:La/d/b;

    invoke-virtual {v0, p1}, La/d/i;->get(Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object v0

    check-cast v0, Landroidx/recyclerview/widget/O$a;

    if-nez v0, :cond_0

    invoke-static {}, Landroidx/recyclerview/widget/O$a;->b()Landroidx/recyclerview/widget/O$a;

    move-result-object v0

    iget-object v1, p0, Landroidx/recyclerview/widget/O;->a:La/d/b;

    invoke-virtual {v1, p1, v0}, La/d/i;->put(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;

    :cond_0
    iput-object p2, v0, Landroidx/recyclerview/widget/O$a;->d:Landroidx/recyclerview/widget/D$e$c;

    iget p1, v0, Landroidx/recyclerview/widget/O$a;->b:I

    or-int/lit8 p1, p1, 0x8

    iput p1, v0, Landroidx/recyclerview/widget/O$a;->b:I

    return-void
.end method

.method b(Landroidx/recyclerview/widget/D$w;)Z
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/O;->a:La/d/b;

    invoke-virtual {v0, p1}, La/d/i;->get(Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object p1

    check-cast p1, Landroidx/recyclerview/widget/O$a;

    const/4 v0, 0x1

    if-eqz p1, :cond_0

    iget p1, p1, Landroidx/recyclerview/widget/O$a;->b:I

    and-int/2addr p1, v0

    if-eqz p1, :cond_0

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return v0
.end method

.method c(Landroidx/recyclerview/widget/D$w;Landroidx/recyclerview/widget/D$e$c;)V
    .locals 2

    iget-object v0, p0, Landroidx/recyclerview/widget/O;->a:La/d/b;

    invoke-virtual {v0, p1}, La/d/i;->get(Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object v0

    check-cast v0, Landroidx/recyclerview/widget/O$a;

    if-nez v0, :cond_0

    invoke-static {}, Landroidx/recyclerview/widget/O$a;->b()Landroidx/recyclerview/widget/O$a;

    move-result-object v0

    iget-object v1, p0, Landroidx/recyclerview/widget/O;->a:La/d/b;

    invoke-virtual {v1, p1, v0}, La/d/i;->put(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;

    :cond_0
    iput-object p2, v0, Landroidx/recyclerview/widget/O$a;->c:Landroidx/recyclerview/widget/D$e$c;

    iget p1, v0, Landroidx/recyclerview/widget/O$a;->b:I

    or-int/lit8 p1, p1, 0x4

    iput p1, v0, Landroidx/recyclerview/widget/O$a;->b:I

    return-void
.end method

.method c(Landroidx/recyclerview/widget/D$w;)Z
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/O;->a:La/d/b;

    invoke-virtual {v0, p1}, La/d/i;->get(Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object p1

    check-cast p1, Landroidx/recyclerview/widget/O$a;

    if-eqz p1, :cond_0

    iget p1, p1, Landroidx/recyclerview/widget/O$a;->b:I

    and-int/lit8 p1, p1, 0x4

    if-eqz p1, :cond_0

    const/4 p1, 0x1

    goto :goto_0

    :cond_0
    const/4 p1, 0x0

    :goto_0
    return p1
.end method

.method public d(Landroidx/recyclerview/widget/D$w;)V
    .locals 0

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/O;->g(Landroidx/recyclerview/widget/D$w;)V

    return-void
.end method

.method e(Landroidx/recyclerview/widget/D$w;)Landroidx/recyclerview/widget/D$e$c;
    .locals 1

    const/16 v0, 0x8

    invoke-direct {p0, p1, v0}, Landroidx/recyclerview/widget/O;->a(Landroidx/recyclerview/widget/D$w;I)Landroidx/recyclerview/widget/D$e$c;

    move-result-object p1

    return-object p1
.end method

.method f(Landroidx/recyclerview/widget/D$w;)Landroidx/recyclerview/widget/D$e$c;
    .locals 1

    const/4 v0, 0x4

    invoke-direct {p0, p1, v0}, Landroidx/recyclerview/widget/O;->a(Landroidx/recyclerview/widget/D$w;I)Landroidx/recyclerview/widget/D$e$c;

    move-result-object p1

    return-object p1
.end method

.method g(Landroidx/recyclerview/widget/D$w;)V
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/O;->a:La/d/b;

    invoke-virtual {v0, p1}, La/d/i;->get(Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object p1

    check-cast p1, Landroidx/recyclerview/widget/O$a;

    if-nez p1, :cond_0

    return-void

    :cond_0
    iget v0, p1, Landroidx/recyclerview/widget/O$a;->b:I

    and-int/lit8 v0, v0, -0x2

    iput v0, p1, Landroidx/recyclerview/widget/O$a;->b:I

    return-void
.end method

.method h(Landroidx/recyclerview/widget/D$w;)V
    .locals 2

    iget-object v0, p0, Landroidx/recyclerview/widget/O;->b:La/d/f;

    invoke-virtual {v0}, La/d/f;->b()I

    move-result v0

    add-int/lit8 v0, v0, -0x1

    :goto_0
    if-ltz v0, :cond_1

    iget-object v1, p0, Landroidx/recyclerview/widget/O;->b:La/d/f;

    invoke-virtual {v1, v0}, La/d/f;->c(I)Ljava/lang/Object;

    move-result-object v1

    if-ne p1, v1, :cond_0

    iget-object v1, p0, Landroidx/recyclerview/widget/O;->b:La/d/f;

    invoke-virtual {v1, v0}, La/d/f;->b(I)V

    goto :goto_1

    :cond_0
    add-int/lit8 v0, v0, -0x1

    goto :goto_0

    :cond_1
    :goto_1
    iget-object v0, p0, Landroidx/recyclerview/widget/O;->a:La/d/b;

    invoke-virtual {v0, p1}, La/d/i;->remove(Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object p1

    check-cast p1, Landroidx/recyclerview/widget/O$a;

    if-eqz p1, :cond_2

    invoke-static {p1}, Landroidx/recyclerview/widget/O$a;->a(Landroidx/recyclerview/widget/O$a;)V

    :cond_2
    return-void
.end method
