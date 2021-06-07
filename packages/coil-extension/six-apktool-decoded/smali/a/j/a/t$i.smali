.class La/j/a/t$i;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements La/j/a/g$c;


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = La/j/a/t;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x8
    name = "i"
.end annotation


# instance fields
.field final a:Z

.field final b:La/j/a/a;

.field private c:I


# direct methods
.method constructor <init>(La/j/a/a;Z)V
    .locals 0

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    iput-boolean p2, p0, La/j/a/t$i;->a:Z

    iput-object p1, p0, La/j/a/t$i;->b:La/j/a/a;

    return-void
.end method


# virtual methods
.method public a()V
    .locals 1

    iget v0, p0, La/j/a/t$i;->c:I

    add-int/lit8 v0, v0, 0x1

    iput v0, p0, La/j/a/t$i;->c:I

    return-void
.end method

.method public b()V
    .locals 1

    iget v0, p0, La/j/a/t$i;->c:I

    add-int/lit8 v0, v0, -0x1

    iput v0, p0, La/j/a/t$i;->c:I

    iget v0, p0, La/j/a/t$i;->c:I

    if-eqz v0, :cond_0

    return-void

    :cond_0
    iget-object v0, p0, La/j/a/t$i;->b:La/j/a/a;

    iget-object v0, v0, La/j/a/a;->a:La/j/a/t;

    invoke-virtual {v0}, La/j/a/t;->v()V

    return-void
.end method

.method public c()V
    .locals 4

    iget-object v0, p0, La/j/a/t$i;->b:La/j/a/a;

    iget-object v1, v0, La/j/a/a;->a:La/j/a/t;

    iget-boolean v2, p0, La/j/a/t$i;->a:Z

    const/4 v3, 0x0

    invoke-virtual {v1, v0, v2, v3, v3}, La/j/a/t;->a(La/j/a/a;ZZZ)V

    return-void
.end method

.method public d()V
    .locals 7

    iget v0, p0, La/j/a/t$i;->c:I

    const/4 v1, 0x0

    const/4 v2, 0x1

    if-lez v0, :cond_0

    move v0, v2

    goto :goto_0

    :cond_0
    move v0, v1

    :goto_0
    iget-object v3, p0, La/j/a/t$i;->b:La/j/a/a;

    iget-object v3, v3, La/j/a/a;->a:La/j/a/t;

    iget-object v4, v3, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v4}, Ljava/util/ArrayList;->size()I

    move-result v4

    :goto_1
    if-ge v1, v4, :cond_2

    iget-object v5, v3, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v5, v1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v5

    check-cast v5, La/j/a/g;

    const/4 v6, 0x0

    invoke-virtual {v5, v6}, La/j/a/g;->a(La/j/a/g$c;)V

    if-eqz v0, :cond_1

    invoke-virtual {v5}, La/j/a/g;->D()Z

    move-result v6

    if-eqz v6, :cond_1

    invoke-virtual {v5}, La/j/a/g;->Y()V

    :cond_1
    add-int/lit8 v1, v1, 0x1

    goto :goto_1

    :cond_2
    iget-object v1, p0, La/j/a/t$i;->b:La/j/a/a;

    iget-object v3, v1, La/j/a/a;->a:La/j/a/t;

    iget-boolean v4, p0, La/j/a/t$i;->a:Z

    xor-int/2addr v0, v2

    invoke-virtual {v3, v1, v4, v0, v2}, La/j/a/t;->a(La/j/a/a;ZZZ)V

    return-void
.end method

.method public e()Z
    .locals 1

    iget v0, p0, La/j/a/t$i;->c:I

    if-nez v0, :cond_0

    const/4 v0, 0x1

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return v0
.end method
