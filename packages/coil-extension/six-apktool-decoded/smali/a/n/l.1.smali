.class La/n/l;
.super La/n/F;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/n/m;->a(Landroid/view/ViewGroup;La/n/M;La/n/M;)Landroid/animation/Animator;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field a:Z

.field final synthetic b:Landroid/view/ViewGroup;

.field final synthetic c:La/n/m;


# direct methods
.method constructor <init>(La/n/m;Landroid/view/ViewGroup;)V
    .locals 0

    iput-object p1, p0, La/n/l;->c:La/n/m;

    iput-object p2, p0, La/n/l;->b:Landroid/view/ViewGroup;

    invoke-direct {p0}, La/n/F;-><init>()V

    const/4 p1, 0x0

    iput-boolean p1, p0, La/n/l;->a:Z

    return-void
.end method


# virtual methods
.method public b(La/n/E;)V
    .locals 1

    iget-object p1, p0, La/n/l;->b:Landroid/view/ViewGroup;

    const/4 v0, 0x0

    invoke-static {p1, v0}, La/n/S;->a(Landroid/view/ViewGroup;Z)V

    return-void
.end method

.method public c(La/n/E;)V
    .locals 2

    iget-boolean v0, p0, La/n/l;->a:Z

    if-nez v0, :cond_0

    iget-object v0, p0, La/n/l;->b:Landroid/view/ViewGroup;

    const/4 v1, 0x0

    invoke-static {v0, v1}, La/n/S;->a(Landroid/view/ViewGroup;Z)V

    :cond_0
    invoke-virtual {p1, p0}, La/n/E;->b(La/n/E$c;)La/n/E;

    return-void
.end method

.method public d(La/n/E;)V
    .locals 1

    iget-object p1, p0, La/n/l;->b:Landroid/view/ViewGroup;

    const/4 v0, 0x1

    invoke-static {p1, v0}, La/n/S;->a(Landroid/view/ViewGroup;Z)V

    return-void
.end method
