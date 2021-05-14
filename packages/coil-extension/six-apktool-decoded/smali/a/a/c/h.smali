.class La/a/c/h;
.super La/g/i/A;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = La/a/c/i;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field private a:Z

.field private b:I

.field final synthetic c:La/a/c/i;


# direct methods
.method constructor <init>(La/a/c/i;)V
    .locals 0

    iput-object p1, p0, La/a/c/h;->c:La/a/c/i;

    invoke-direct {p0}, La/g/i/A;-><init>()V

    const/4 p1, 0x0

    iput-boolean p1, p0, La/a/c/h;->a:Z

    iput p1, p0, La/a/c/h;->b:I

    return-void
.end method


# virtual methods
.method a()V
    .locals 1

    const/4 v0, 0x0

    iput v0, p0, La/a/c/h;->b:I

    iput-boolean v0, p0, La/a/c/h;->a:Z

    iget-object v0, p0, La/a/c/h;->c:La/a/c/i;

    invoke-virtual {v0}, La/a/c/i;->b()V

    return-void
.end method

.method public b(Landroid/view/View;)V
    .locals 1

    iget p1, p0, La/a/c/h;->b:I

    add-int/lit8 p1, p1, 0x1

    iput p1, p0, La/a/c/h;->b:I

    iget-object v0, p0, La/a/c/h;->c:La/a/c/i;

    iget-object v0, v0, La/a/c/i;->a:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    if-ne p1, v0, :cond_1

    iget-object p1, p0, La/a/c/h;->c:La/a/c/i;

    iget-object p1, p1, La/a/c/i;->d:La/g/i/z;

    if-eqz p1, :cond_0

    const/4 v0, 0x0

    invoke-interface {p1, v0}, La/g/i/z;->b(Landroid/view/View;)V

    :cond_0
    invoke-virtual {p0}, La/a/c/h;->a()V

    :cond_1
    return-void
.end method

.method public c(Landroid/view/View;)V
    .locals 1

    iget-boolean p1, p0, La/a/c/h;->a:Z

    if-eqz p1, :cond_0

    return-void

    :cond_0
    const/4 p1, 0x1

    iput-boolean p1, p0, La/a/c/h;->a:Z

    iget-object p1, p0, La/a/c/h;->c:La/a/c/i;

    iget-object p1, p1, La/a/c/i;->d:La/g/i/z;

    if-eqz p1, :cond_1

    const/4 v0, 0x0

    invoke-interface {p1, v0}, La/g/i/z;->c(Landroid/view/View;)V

    :cond_1
    return-void
.end method
