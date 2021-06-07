.class public abstract Landroidx/recyclerview/widget/D$e;
.super Ljava/lang/Object;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/recyclerview/widget/D;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x409
    name = "e"
.end annotation

.annotation system Ldalvik/annotation/MemberClasses;
    value = {
        Landroidx/recyclerview/widget/D$e$c;,
        Landroidx/recyclerview/widget/D$e$a;,
        Landroidx/recyclerview/widget/D$e$b;
    }
.end annotation


# instance fields
.field private a:Landroidx/recyclerview/widget/D$e$b;

.field private b:Ljava/util/ArrayList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/ArrayList<",
            "Landroidx/recyclerview/widget/D$e$a;",
            ">;"
        }
    .end annotation
.end field

.field private c:J

.field private d:J

.field private e:J

.field private f:J


# direct methods
.method public constructor <init>()V
    .locals 2

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    const/4 v0, 0x0

    iput-object v0, p0, Landroidx/recyclerview/widget/D$e;->a:Landroidx/recyclerview/widget/D$e$b;

    new-instance v0, Ljava/util/ArrayList;

    invoke-direct {v0}, Ljava/util/ArrayList;-><init>()V

    iput-object v0, p0, Landroidx/recyclerview/widget/D$e;->b:Ljava/util/ArrayList;

    const-wide/16 v0, 0x78

    iput-wide v0, p0, Landroidx/recyclerview/widget/D$e;->c:J

    iput-wide v0, p0, Landroidx/recyclerview/widget/D$e;->d:J

    const-wide/16 v0, 0xfa

    iput-wide v0, p0, Landroidx/recyclerview/widget/D$e;->e:J

    iput-wide v0, p0, Landroidx/recyclerview/widget/D$e;->f:J

    return-void
.end method

.method static a(Landroidx/recyclerview/widget/D$w;)I
    .locals 3

    iget v0, p0, Landroidx/recyclerview/widget/D$w;->k:I

    and-int/lit8 v0, v0, 0xe

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$w;->n()Z

    move-result v1

    if-eqz v1, :cond_0

    const/4 p0, 0x4

    return p0

    :cond_0
    and-int/lit8 v1, v0, 0x4

    if-nez v1, :cond_1

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$w;->j()I

    move-result v1

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$w;->f()I

    move-result p0

    const/4 v2, -0x1

    if-eq v1, v2, :cond_1

    if-eq p0, v2, :cond_1

    if-eq v1, p0, :cond_1

    or-int/lit16 v0, v0, 0x800

    :cond_1
    return v0
.end method


# virtual methods
.method public a(Landroidx/recyclerview/widget/D$t;Landroidx/recyclerview/widget/D$w;)Landroidx/recyclerview/widget/D$e$c;
    .locals 0

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$e;->h()Landroidx/recyclerview/widget/D$e$c;

    move-result-object p1

    invoke-virtual {p1, p2}, Landroidx/recyclerview/widget/D$e$c;->a(Landroidx/recyclerview/widget/D$w;)Landroidx/recyclerview/widget/D$e$c;

    return-object p1
.end method

.method public a(Landroidx/recyclerview/widget/D$t;Landroidx/recyclerview/widget/D$w;ILjava/util/List;)Landroidx/recyclerview/widget/D$e$c;
    .locals 0
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "Landroidx/recyclerview/widget/D$t;",
            "Landroidx/recyclerview/widget/D$w;",
            "I",
            "Ljava/util/List<",
            "Ljava/lang/Object;",
            ">;)",
            "Landroidx/recyclerview/widget/D$e$c;"
        }
    .end annotation

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$e;->h()Landroidx/recyclerview/widget/D$e$c;

    move-result-object p1

    invoke-virtual {p1, p2}, Landroidx/recyclerview/widget/D$e$c;->a(Landroidx/recyclerview/widget/D$w;)Landroidx/recyclerview/widget/D$e$c;

    return-object p1
.end method

.method public final a()V
    .locals 3

    iget-object v0, p0, Landroidx/recyclerview/widget/D$e;->b:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    const/4 v1, 0x0

    :goto_0
    if-ge v1, v0, :cond_0

    iget-object v2, p0, Landroidx/recyclerview/widget/D$e;->b:Ljava/util/ArrayList;

    invoke-virtual {v2, v1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, Landroidx/recyclerview/widget/D$e$a;

    invoke-interface {v2}, Landroidx/recyclerview/widget/D$e$a;->a()V

    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_0
    iget-object v0, p0, Landroidx/recyclerview/widget/D$e;->b:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->clear()V

    return-void
.end method

.method a(Landroidx/recyclerview/widget/D$e$b;)V
    .locals 0

    iput-object p1, p0, Landroidx/recyclerview/widget/D$e;->a:Landroidx/recyclerview/widget/D$e$b;

    return-void
.end method

.method public abstract a(Landroidx/recyclerview/widget/D$w;Landroidx/recyclerview/widget/D$e$c;Landroidx/recyclerview/widget/D$e$c;)Z
.end method

.method public abstract a(Landroidx/recyclerview/widget/D$w;Landroidx/recyclerview/widget/D$w;Landroidx/recyclerview/widget/D$e$c;Landroidx/recyclerview/widget/D$e$c;)Z
.end method

.method public a(Landroidx/recyclerview/widget/D$w;Ljava/util/List;)Z
    .locals 0
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "Landroidx/recyclerview/widget/D$w;",
            "Ljava/util/List<",
            "Ljava/lang/Object;",
            ">;)Z"
        }
    .end annotation

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/D$e;->b(Landroidx/recyclerview/widget/D$w;)Z

    move-result p1

    return p1
.end method

.method public abstract b()V
.end method

.method public abstract b(Landroidx/recyclerview/widget/D$w;)Z
.end method

.method public abstract b(Landroidx/recyclerview/widget/D$w;Landroidx/recyclerview/widget/D$e$c;Landroidx/recyclerview/widget/D$e$c;)Z
.end method

.method public c()J
    .locals 2

    iget-wide v0, p0, Landroidx/recyclerview/widget/D$e;->c:J

    return-wide v0
.end method

.method public final c(Landroidx/recyclerview/widget/D$w;)V
    .locals 1

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/D$e;->e(Landroidx/recyclerview/widget/D$w;)V

    iget-object v0, p0, Landroidx/recyclerview/widget/D$e;->a:Landroidx/recyclerview/widget/D$e$b;

    if-eqz v0, :cond_0

    invoke-interface {v0, p1}, Landroidx/recyclerview/widget/D$e$b;->a(Landroidx/recyclerview/widget/D$w;)V

    :cond_0
    return-void
.end method

.method public abstract c(Landroidx/recyclerview/widget/D$w;Landroidx/recyclerview/widget/D$e$c;Landroidx/recyclerview/widget/D$e$c;)Z
.end method

.method public d()J
    .locals 2

    iget-wide v0, p0, Landroidx/recyclerview/widget/D$e;->f:J

    return-wide v0
.end method

.method public abstract d(Landroidx/recyclerview/widget/D$w;)V
.end method

.method public e()J
    .locals 2

    iget-wide v0, p0, Landroidx/recyclerview/widget/D$e;->e:J

    return-wide v0
.end method

.method public e(Landroidx/recyclerview/widget/D$w;)V
    .locals 0

    return-void
.end method

.method public f()J
    .locals 2

    iget-wide v0, p0, Landroidx/recyclerview/widget/D$e;->d:J

    return-wide v0
.end method

.method public abstract g()Z
.end method

.method public h()Landroidx/recyclerview/widget/D$e$c;
    .locals 1

    new-instance v0, Landroidx/recyclerview/widget/D$e$c;

    invoke-direct {v0}, Landroidx/recyclerview/widget/D$e$c;-><init>()V

    return-object v0
.end method

.method public abstract i()V
.end method
