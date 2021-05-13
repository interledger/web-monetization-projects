.class La/a/b/a/b$c;
.super La/a/b/a/b$f;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = La/a/b/a/b;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0xa
    name = "c"
.end annotation


# instance fields
.field private final a:La/o/a/a/d;


# direct methods
.method constructor <init>(La/o/a/a/d;)V
    .locals 1

    const/4 v0, 0x0

    invoke-direct {p0, v0}, La/a/b/a/b$f;-><init>(La/a/b/a/a;)V

    iput-object p1, p0, La/a/b/a/b$c;->a:La/o/a/a/d;

    return-void
.end method


# virtual methods
.method public c()V
    .locals 1

    iget-object v0, p0, La/a/b/a/b$c;->a:La/o/a/a/d;

    invoke-virtual {v0}, La/o/a/a/d;->start()V

    return-void
.end method

.method public d()V
    .locals 1

    iget-object v0, p0, La/a/b/a/b$c;->a:La/o/a/a/d;

    invoke-virtual {v0}, La/o/a/a/d;->stop()V

    return-void
.end method
